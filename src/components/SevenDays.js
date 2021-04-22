import React from 'react'


export default function SevenDays(props) {
    const {geocode, sevenDays} = props
    return (
        <div>
            <h3>Weather for the next 7 days in {geocode.label}</h3>
            {sevenDays ?
            <div className="weatherContainer">
                {sevenDays[0] && sevenDays.map((item, key) => (
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
