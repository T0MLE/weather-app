import PropTypes from "prop-types";

function WeatherDetails({ icon, day, tempMin, tempMax }) {
  return (
    <div className="weather-card">
      <div className="weather-card__icon-date">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="picture representing today's weather"
        />
        <div className="weather-card__date">
          <p>{day[0].toLowerCase()}</p>
          <p>{day[2]}</p>
          <p>{day[1].toLowerCase()}</p>
        </div>
      </div>
      <div className="weather-card__temp">
        <p>MIN TEMP</p>
        <p>{tempMin}°C</p>
        <p>MAX TEMP</p>
        <p>{tempMax}°C</p>
      </div>
    </div>
  );
}

export default WeatherDetails;

WeatherDetails.propTypes = {
  icon: PropTypes.string,
  day: PropTypes.arrayOf(PropTypes.string),
  tempMin: PropTypes.number,
  tempMax: PropTypes.number,
};
