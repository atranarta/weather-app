import { API_key } from '../constants';

const navigatorCall = () => new Promise((resolve) => {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    resolve([latitude, longitude]);
  });
});

const getWeather = async (latitude, longitude) => {
  if (latitude !== '' && longitude !== '') {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`);
    const data = await res.json();
    return data;
  }
}

export const getCurrentPositionWeather = async () => {
  const [latitude, longitude] = await navigatorCall();
  const weather = await getWeather(latitude, longitude);
  return weather;
};

export default getCurrentPositionWeather;