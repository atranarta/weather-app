const cityNameSearch = (setWeather, setQuery, query, API_key) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_key}&units=metric`)
    .then((res) => res.json())
    .then((data) => {

      setWeather(data);
      setQuery('');
    })
}

export default cityNameSearch;