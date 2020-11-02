const API_key = process.env.REACT_APP_API_KEY;

const cityNameSearch = (setWeather, setQuery, setLoading, query) => {
  setLoading(true);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_key}&units=metric`)
    .then((res) => {
      setLoading(false);
      if (!res.ok) {
        throw Error(res.statusText);
      }

      return res.json()
    })
    .then((data) => {
      setWeather(data);
      setQuery('');
    })
    .catch((error) => console.log(error));
}

export default cityNameSearch;