import React, { useState, useEffect } from "react";

import dateBuilder from "./dateBuilder";
import backgroundChange from "./backgroundChange";
import getCurrentPositionWeather from "./getCurrentPositionWeather";
import cityNameSearch from "./cityNameSearch";

import Loader from "./../images/loader.gif";

const WeatherFetch = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const callFunction = async () => {
      setLoading(true);
      const newWeather = await getCurrentPositionWeather();
      setWeather(newWeather);
      setLoading(false);
    };

    callFunction();
  }, []);

  const onKeyPressHandler = evt => {
    if (evt.key === "Enter") {
      cityNameSearch(setWeather, setQuery, setLoading, query);
    }
  };

  const backgroundStyle = weather !== null ? backgroundChange(weather.weather[0].id) : {};

  const weatherBlock = (data) => {
    if (isLoading) {
      return (
        <img className="loader" src={Loader} alt="loading" />
      );
    }

    if (data === null) {
      return (
        <p className="error">Something goes wrong. Retry later.</p>
      );
    }
  };

  return (
    <div className="app" style={backgroundStyle}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter the city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={onKeyPressHandler}
          />
        </div>
        {weather !== null && weather.weather !== null ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temperature-box">
                <div className="temperature">
                  {Math.round(weather.main.temp)} &#176;C
                </div>
                <div className="feelsLike">
                  Feels Like: {Math.round(weather.main.feels_like)} &#176;C
                </div>
              </div>
              <div className="weather">
                <div className="main">{weather.weather[0].main}</div>
                <div className="description">
                  {weather.weather[0].description}
                </div>
              </div>
              <div className="icon">
                <img
                  alt=""
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
              </div>
            </div>
          </>
        ) : (
            ""
          )}
        <div className="loader-wrapper">
          {weatherBlock(weather)}
        </div>
      </main>
    </div>
  );
};

export default WeatherFetch;