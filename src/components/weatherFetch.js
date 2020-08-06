import React, { useState } from "react";

import dateBuilder from "./dateBuilder"

const WeatherFetch = () => {
  const key = process.env.REACT_APP_API_KEY;

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=metric`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setWeather(data);
          setQuery('');
        })
    }
  }

  return (
    <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app cold') : 'app cold'}>
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Enter the city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? (
          <>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temperature-box">
                <div className="temperature">{Math.round(weather.main.temp)} &#176;C</div>
                <div className="feelsLike">Feels Like: {Math.round(weather.main.feels_like)} &#176;C</div>
              </div>
              <div className="weather">
                <div className="main">{weather.weather[0].main}</div>
                <div className="description">{weather.weather[0].description}</div>
              </div>
              <div className="icon">
                <img alt="" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
              </div>
            </div>
          </>
        ) : ('')}
      </main>
    </div>
  )
};

export default WeatherFetch;
