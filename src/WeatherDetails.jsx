import PropTypes from "prop-types";

function WeatherDetails({ icon, day, tempMin, tempMax }) {
  return (
    <div className="weather-details">
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <p>{day}</p>
      <p>{tempMin}</p>
      <p>{tempMax}</p>
    </div>
  );
}

export default WeatherDetails;

WeatherDetails.propTypes = {
  icon: PropTypes.string,
  day: PropTypes.string,
  tempMin: PropTypes.string,
  tempMax: PropTypes.string,
};
