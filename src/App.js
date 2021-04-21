import './App.css';
import {useState, useEffect} from 'react'
import Search from './components/Search'
import Today from './components/Today'
import SevenDays from './components/SevenDays'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
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

  return (
    <Router>
      <div className="favorites">
        <p>Favorites</p>
        {favorites[0] ? favorites.map((item) => ( 
          <button onClick={() => loadFavorite(item)}>{item.name}</button>
        )) : 'You have no favorite locations!'}
      </div>
      <div className="App">
        {coords ? 
        <div>
          <button onClick={addToFavorites}>Favorite this location!</button>
          <Link className="links" to="today">Today's weather</Link> 
          <Link className="links" to="7day">Seven Day Forecast</Link>
        </div> : null}
        <Switch>
          <Route path="/today">
            <Today coords={coords} geocode={geocode} today={today}/>
          </Route>
          <Route path="/7day">
            <SevenDays coords={coords} geocode={geocode} sevenDays={sevenDays}/>
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
