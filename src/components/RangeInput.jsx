import PropTypes from "prop-types";

function RangeInput({ minMax, temp, setTemp, setCurrentPage }) {

// set a minimum and maximum temperature and make sure max cant be less than minimum
  const handleChange = (e) => {
    if (minMax === "min" && e.target.value > temp.maxTemp) {
      return;
    }

    if (minMax === "max" && e.target.value < temp.minTemp) {
      return;
    }

    setTemp({
      ...temp,
      [minMax + "Temp"]: +e.target.value,
    });

    // go back to page 1 when new filter is applied
    setCurrentPage(1);
  };

  return (
    <div className="temperature-input-container">
      <div className="temperature-input-container__text">
        <p className="temperature-input-container__title">{minMax} temp</p>
        <p className="temperature-input-container__temp">
          {minMax === "min" ? temp.minTemp : temp.maxTemp}°C
        </p>
      </div>
      <div className="temperature-input-container__inputs">
        <input
          type="range"
          min="-10"
          max="45"
          value={minMax === "min" ? temp.minTemp : temp.maxTemp}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default RangeInput;

RangeInput.propTypes = {
  minMax: PropTypes.string,
  temp: PropTypes.shape({
    minTemp: PropTypes.number,
    maxTemp: PropTypes.number,
  }),
  setTemp: PropTypes.func,
  setCurrentPage: PropTypes.func,
};
