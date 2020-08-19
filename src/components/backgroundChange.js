import mist from "./../images/fog.jpg";
import sunny from "./../images/sunny.jpg";
import snow from "./../images/snow.jpg";
import rain from "./../images/rain.jpg";
import clouds from "./../images/clouds.jpg";
import thunderstorm from "./../images/thunderstorm.jpg";

const backgroundChange = (weatherTypeID) => {
  if (weatherTypeID === 800) return { backgroundImage: `url(${sunny})` };

  switch (weatherTypeID.toString()[0]) {
    case '8':
      return { backgroundImage: `url(${clouds})` };
    case '5':
      return { backgroundImage: `url(${rain})` };
    case '3':
      return { backgroundImage: `url(${rain})` };
    case '2':
      return { backgroundImage: `url(${thunderstorm})` };
    case '6':
      return { backgroundImage: `url(${snow})` };
    case '7':
      return { backgroundImage: `url(${mist})` };
    default:
      return { backgroundColor: '#4d87df' };
  }
}

export default backgroundChange;