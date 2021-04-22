import React, {useState, useEffect} from 'react'

export default function Today(props) {
    const {geocode, today} = props
    const [high, setHigh] = useState(-Infinity)
    const [low, setLow] = useState(Infinity)
    const [current, setCurrent] = useState()

    useEffect(() => {
        if(today) {
            setHighandLow()
        }
    }, [today])
    const setHighandLow = () => {
        setCurrent(today[0].temperature)
        let tempHigh = today[0].temperature
        let tempLow = today[0].temperature
        for(let i = 0; i < 23; i++) {
            if(today[i].temperature > tempHigh) {
                tempHigh = today[i].temperature
            }
            if(today[i].temperature < tempLow) {
                tempLow = today[i].temperature
            }
        }
        setHigh(tempHigh)
        setLow(tempLow)
    }
    return (
        <div>
            <h3>Current Weather in {geocode.label}</h3>
            <p>Current temp: {current} F</p>
            <div>
                <h3 className="titletemp">Next 24 hours:</h3>
                <p className="temp">High: {high}</p>
                <p className="temp">Low: {low}</p>
            </div>
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
