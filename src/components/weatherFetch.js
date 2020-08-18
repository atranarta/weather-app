import React, { useState, useEffect } from "react";

import dateBuilder from "./dateBuilder"

import mist from "./../images/fog.jpg";
import sunny from "./../images/sunny.jpg";
import snow from "./../images/snow.jpg";
import rain from "./../images/rain.jpg";
import clouds from "./../images/clouds.jpg";
import thunderstorm from "./../images/thunderstorm.jpg";

const WeatherFetch = () => {
  const key = process.env.REACT_APP_API_KEY;

  const [query, setQuery] = useState('Berlin');
  const [weather, setWeather] = useState(null);

  // const success = position => {
  //   let latitude = position.coords.latitude;
  //   let longitude = position.coords.longitude;

  //   return (latitude, longitude);
  // };

  // navigator.geolocation.getCurrentPosition(success);

  // useEffect(() => {
  //   async function getWeather(latitude, longitude) {
  //     if (latitude !== '' && longitude !== '') {
  //       console.log(latitude, longitude);
  //       await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);

  //           setWeather(data);
  //         });
  //     }
  //   }
  //   getWeather();
  // });


  // const getWeather = (latitude, longitude) => {
  //   if (latitude !== '' && longitude !== '') {
  //     console.log(latitude, longitude);
  //     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);

  //         setWeather(data);
  //       })
  //   }
  // }


  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=metric`)
        .then((res) => res.json())
        .then((data) => {

          setWeather(data);
          setQuery('');
        })
    }
  }


  const backgroundChange = (weatherTypeID) => {
    if (weatherTypeID === 800) return { backgroundImage: { sunny } };

    switch (weatherTypeID.toString()[0]) {
      case '8':
        return { backgroundImage: `url(${clouds})`};
      case '5':
        return { backgroundImage: `url(${rain})`};
      case '3':
        return { backgroundImage: `url(${rain})`};
      case '2':
        return { backgroundImage: `url(${thunderstorm})`};
      case '6':
        return { backgroundImage: `url(${snow})`};
      case '7':
        return { backgroundImage: `url(${mist})` };
      default:
        return { backgroundColor: '#4d87df' };
    }
  }

  const backgroundStyle = weather !== null ? backgroundChange(weather.weather[0].id) : {};

  return (
    <div className="app" style={backgroundStyle}>
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
      {(weather !== null) ? (
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
