import './App.css';
import {useState, useEffect} from 'react'
import Search from './components/Search'
import Today from './components/Today'
import SevenDays from './components/SevenDays'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom"
import axios from 'axios'

function App() {
  const [coords, setCoords] = useState()
  const [geocode, setGeocode] = useState()
  const [today, setToday] = useState()
  const [sevenDays, setSevenDays] = useState()
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])
  useEffect(() => {
    console.log(favorites)
    if(coords) {
      fetchTodayData()
      fetchSevenDaysData()
    }
  }, [coords])

  const fetchTodayData = () => {
    axios.get(`https://api.weather.gov/points/${coords[0]},${coords[1]}/forecast/hourly`)
    .then((response) => {
      console.log(response)
      setToday(response.data.properties.periods)
    })
    .catch((error) => {
        console.log(error)
        alert("An error has occured. Please try again with a different address.")
    })
}

  const fetchSevenDaysData = () => {
    axios.get(`https://api.weather.gov/points/${coords[0]},${coords[1]}/forecast`)
    .then((response) => {
      console.log(response)
      setSevenDays(response.data.properties.periods)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  const addToFavorites = () => {
    let newFavorites = [...favorites]
    newFavorites.push({name: geocode.label, coords})
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setFavorites(JSON.parse(localStorage.getItem('favorites')))
    console.log('added to localstorage!')
  }

  const loadFavorite = (item) => {
    setCoords(item.coords)
    setGeocode({label: item.name})
  }

  const removeFavorite = (item) => {
    let newFavorites = [...favorites]
    console.log(newFavorites.indexOf(item), newFavorites)
    newFavorites.splice(newFavorites.indexOf(item), 1)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setFavorites(JSON.parse(localStorage.getItem('favorites')))
  }

  return (
    <Router>
      <div className="favorites">
        <h4 className="favoritesTitle">Favorites</h4>
        {favorites[0] ? favorites.map((item, key) => ( 
          <div key={key} className="singleFavorite">
          <button onClick={() => loadFavorite(item)}>{item.name}</button>
          <button onClick={() => removeFavorite(item)}>Unfavorite</button>
          </div>
        )) : 'You have no favorite locations!'}
      </div>
      <div className="App">
        {coords ? 
        <div>
        <button className="favoriteButton" onClick={addToFavorites}>Favorite this location!</button>
        <div className="links">
          <Link className="singleLink" to="/" onClick={() => setCoords()}>Back to search</Link> 
          <Link className="singleLink" to="today">Today's weather</Link> 
          <Link className="singleLink" to="7day">Seven Day Forecast</Link>
        </div></div> : null}
        <Switch>
          <Route path="/today">
            {coords ? <Today coords={coords} geocode={geocode} today={today}/> : <Redirect to="/"/>}
          </Route>
          <Route path="/7day">
            {coords ? <SevenDays coords={coords} geocode={geocode} sevenDays={sevenDays}/> : <Redirect to="/"/>}
          </Route>
          <Route exact path="/">
            <Search coords={coords} setCoords={setCoords} geocode={geocode} setGeocode={setGeocode}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
