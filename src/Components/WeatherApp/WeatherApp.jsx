import React, { useState } from "react";
import axios from "axios";

function WeatherApp() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a4ca3a81bdb12e3535055e1442e7cdc9`

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setErrorMessage('');
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMessage("City not found. Please enter the correct spelling.");
          setData({});
        } else {
          console.error("An error occurred while fetching data:", error);
          setErrorMessage("An error occurred while fetching data. Please try again.");
        }
      }
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input 
          value= {location} 
          onChange={event => setLocation(event.target.value)} 
          onKeyPress={searchLocation}
          placeholder="Search..."
          type="text" 
        />
        <div className="title">
            <h2>Weather App 1.0</h2>
        </div>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>

          <div className="temp">
              {data.main ? ( <h1>{Math.round((data.main.temp - 32) * 5 / 9)}<sup>o</sup>C</h1> ) : null}

              {errorMessage && <h2>{errorMessage}</h2>}
          </div>


          <div className="weather-desc">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && 
          <div className="bottom">
            <div className="feels">
              {data.main ? (<p className="bold">{Math.round((data.main.feels_like - 32) * 5 / 9)}<sup>o</sup>C</p>) : null}
              <p className="default-text">Feels like</p>
            </div>

            <div className="humidity">
              {data.main ? (<p className="bold">{data.main.humidity}%</p>) : null}
              <p className="default-text">Humdity</p>
            </div>

            <div className="wind">
            {data.main ? (<p className="bold">{data.wind.speed}</p>) : null}
              <p className="default-text">Wind speed</p>
            </div>
          </div>
        } 

      </div>
    </div>
  );
}

export default WeatherApp;
