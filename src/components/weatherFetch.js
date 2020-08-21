import React, { useState } from "react";

import dateBuilder from "./dateBuilder";
import backgroundChange from "./backgroundChange";
import getCurrentPositionWeather from "./getCurrentPositionWeather";
import cityNameSearch from "./cityNameSearch";

import Loader from "./../images/loader.gif";

const WeatherFetch = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setLoading] = useState(true);

  if (weather === null) {
    getCurrentPositionWeather(setLoading, setWeather);
  }

  const onKeyPressHandler = evt => {
    if (evt.key === "Enter") {
      cityNameSearch(setWeather, setQuery, setLoading, query);
    }
  }

  console.log(weather)
  const backgroundStyle = weather !== null ? backgroundChange(weather.weather[0].id) : {};

  const weatherBlock = (data) => {

    if (data === null) {
      return (
        <p className="error">Something goes wrong. Retry later.</p>
      );
    }

    if (isLoading) {
      return (
        <img className="loader" src={Loader} alt="loading" />
      );
    }

    return (
      <>
        <div className="location-box">
          <div className="location">{data.name}, {data.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temperature-box">
            <div className="temperature">{Math.round(data.main.temp)} &#176;C</div>
            <div className="feelsLike">Feels Like: {Math.round(data.main.feels_like)} &#176;C</div>
          </div>
          <div className="weather">
            <div className="main">{data.weather[0].main}</div>
            <div className="description">{data.weather[0].description}</div>
          </div>
          <div className="icon">
            <img alt="" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="app" style={backgroundStyle}>
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Enter the city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={onKeyPressHandler}
          />
        </div>
        <div className="loader-wrapper">
          {weatherBlock(weather)}
        </div>
      </main>
    </div>
  )
};

export default WeatherFetch;