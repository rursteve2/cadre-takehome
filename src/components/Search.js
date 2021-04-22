import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


export default function Search(props) {
    const {coords, setCoords, setGeocode} = props
    const [query, setQuery] = useState('')
    const [error, setError] = useState()

    const handleInput = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setQuery(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let parsedQuery = query.split(" ").join("%20")
        console.log(parsedQuery)
        axios.get(`http://api.positionstack.com/v1/forward?access_key=2f8f8958b1e0532eeadca9b3b88cf587&query=${parsedQuery}`)
        .then(function (response) {
            console.log(response);
            setGeocode(response.data.data[0])
            setCoords([response.data.data[0].latitude, response.data.data[0].longitude])
            if(!response.data.data[0].latitude) {
                setError("Error")
            } else {
                setError()
            }
          })
          .catch(function (error) {
            setError(error)
            console.log(error);
          })

    }
    return (
        <div className="search">
            {coords ? <Redirect to="/today" /> : null}
            <h3>Enter a location: Zip code or Full Address</h3>
            <form onSubmit={handleSubmit}>
                <input placeholder="Address or Zip" className="searchbar" type="text" value={query} onChange={handleInput}/>
                <button className="searchsubmit" type="submit">Search</button>
                {error ? <p>An error has occured. Please check your address and try again.</p> : null}
            </form>
        </div>
    )
}
