import React, { useState, useEffect } from "react";

function WeatherFetch() {
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
  }, [])
  return (
    <>
      <h1>Main Temperature: {mainTemp} &#176;C</h1>
      <h1>Feels Like: {feels_like} &#176;C</h1>
      <h1>Weather Parameter: {main}</h1>
      <h1>Description: {description}</h1>
      <img src={`https://openweathermap.org/img/wn/${iconID}@2x.png`} />
    </>
  )
};

export default WeatherFetch;
