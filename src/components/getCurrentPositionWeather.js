import { API_key } from '../constants';

const getCurrentPositionWeather = (setLoading, setWeather) => {

  let isLoading = false;

  const success = position => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    if (!isLoading) {
      getWeather(latitude, longitude);
    }
  };

  navigator.geolocation.getCurrentPosition(success);

  const getWeather = (latitude, longitude) => {
    if (latitude !== '' && longitude !== '') {
      setLoading(true);
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`)
        .then((res) => {
          setLoading(false);
          
          if (!res.ok) {
            throw Error(res.statusText);
          }
    
          return res.json()
        })
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => console.log(error));
    }
  }
};

export default getCurrentPositionWeather;