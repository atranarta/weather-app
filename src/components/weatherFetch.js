import React, { useState, useEffect } from "react";

import dateBuilder from "./dateBuilder"

const WeatherFetch = () => {
  const key = process.env.REACT_APP_API_KEY;
  const [feels_like, setFeelsLike] = useState('');
  const [mainTemp, setMainTemp] = useState('');
  const [description, setDescription] = useState('');
  const [main, setMain] = useState('');
  const [iconID, setIconID] = useState('');

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${key}&units=metric`;
    fetch(url)
      .then(console.log(url))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeelsLike(data.main.feels_like);
        setMainTemp(data.main.temp);
        setDescription(data.weather[0].description);
        setMain(data.weather[0].main);
        setIconID(data.weather[0].icon);
      })
  })

  return (
    <div className="App cold">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Enter the city..." />
        </div>
        <div className="location-box">
          <div className="location">
            Berlin
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temperature">{Math.round(mainTemp)} &#176;C</div>
          <div className="feelsLike">Feels Like: {Math.round(feels_like)} &#176;C</div>
          <div className="main">{main}</div>
          <div className="description">{description}</div>
        </div>
        <img alt="" src={`https://openweathermap.org/img/wn/${iconID}@2x.png`} />
      </main>
    </div>
  )
};

export default WeatherFetch;
