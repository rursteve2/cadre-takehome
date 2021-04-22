import React from 'react'
import {Redirect} from 'react-router-dom'

export default function Today(props) {
    const {coords, geocode, today} = props    
    return (
        <div>
            {/* {coords ? null : <Redirect to="/"/>} */}
            <h3>Current Weather in {geocode.label}</h3>
            {today ?
            <div className="weatherContainer">
                {today[0] && today.map((item, key) => (
                    <div key={key} className="singleWeather">
                        <h5>{item.name}</h5>
                        <p>{new Date(item.startTime).toLocaleDateString('en-US')}</p>
                        <p>{new Date(item.startTime).toLocaleTimeString('en-US')}</p>
                        <p>{item.temperature} {item.temperatureUnit}</p>
                        <p>{item.shortForecast}</p>
                        <p>Wind: {item.windSpeed} {item.windDirection}</p>
                        <img alt="" src={item.icon} />
                    </div>
                ))}
            </div> : <h1>Loading...</h1>}
        </div>

    )
}
