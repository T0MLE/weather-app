import PropTypes from "prop-types";

function RangeInput({ minMax, temp, setTemp }) {
  const handleChange = (e) => {
    minMax === "MIN"
      ? setTemp({ ...temp, minTemp: e.target.value })
      : setTemp({ ...temp, maxTemp: e.target.value });
  };

  return (
    <div className="input-container">
      <div className="input-container__text">
        <p className="input-container__title">{minMax} TEMP</p>
        <p className="input-container__temp">
          {minMax === "MIN" ? temp.minTemp : temp.maxTemp}°C
        </p>
      </div>
      <div className="input-container__inputs">
        <input
          type="range"
          min="-10"
          max="45"
          value={minMax === "MIN" ? temp.minTemp : temp.maxTemp}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
}

export default RangeInput;

RangeInput.propTypes = {
  minMax: PropTypes.string,
  temp: PropTypes.shape({
    minTemp : PropTypes.number,
    maxTemp : PropTypes.number,
  }),
  setTemp: PropTypes.func,
};
