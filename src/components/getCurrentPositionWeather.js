const getCurrentPositionWeather = (weather, setWeather, API_key) => {
  const success = position => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  };

  navigator.geolocation.getCurrentPosition(success);

  const getWeather = (latitude, longitude) => {
    if (latitude !== '' && longitude !== '') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`)
        .then((res) => res.json())
        .then((data) => {
          if (weather === null) {
            setWeather(data);
          }
        });
    }
  }
};

export default getCurrentPositionWeather;