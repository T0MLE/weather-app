/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.scss";
import RangeInput from "./components/RangeInput";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState({
    minTemp: 0,
    maxTemp: 35,
  });

  const [filteredWeather, setFilteredWeather] = useState([]);
  const [averageTemp, setAverageTemp] = useState(0);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?q=Paris&cnt=15&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((response) => {
        let options = {
          weekday: "short",
          day: "numeric",
          month: "long",
        };
        setWeather(
          response.list.map((e) => {
            e.time = new Date(e.dt * 1000).toLocaleDateString("en-US", options);
            return e;
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setFilteredWeather(
      weather.filter((day) => {
        return (
          Math.round(day.temp.min) >= temp.minTemp &&
          Math.round(day.temp.max) <= temp.maxTemp
        );
      })
    );
    const sumTemp = filteredWeather.reduce(
      (acc, day) => acc + day.temp.min + day.temp.max,
      0
    );
    setAverageTemp(Math.round(sumTemp / (filteredWeather.length * 2)));
  }, [weather.length, temp, filteredWeather.length]);

  return (
    <div className="app">
      <div className="weather-container">
        <h1 className="weather-container__title">Weather forecast</h1>
        <p className="weather-container__subtitle">NEXT 15 DAYS</p>
        <div className="inputs-container">
          <RangeInput
            minMax={"min"}
            temp={temp}
            setTemp={setTemp}
            averageTemp={averageTemp}
            setAverageTemp={setAverageTemp}
            filteredWeather={filteredWeather}
          />
          <RangeInput
            minMax={"max"}
            temp={temp}
            setTemp={setTemp}
            averageTemp={averageTemp}
            setAverageTemp={setAverageTemp}
            filteredWeather={filteredWeather}
          />
        </div>

        {filteredWeather?.map((day, index) => {
          return (
            <WeatherDetails
              key={index}
              icon={day.weather[0].icon}
              day={day.time.replace(",", ".").split(" ")}
              tempMin={Math.round(day.temp.min)}
              tempMax={Math.round(day.temp.max)}
            />
          );
        })}
        <p className='weather-container__average'>
          {filteredWeather.length ? `AVERAGE TEMP : ${averageTemp}°C` : null}
        </p>
      </div>
    </div>
  );
}

export default App;
