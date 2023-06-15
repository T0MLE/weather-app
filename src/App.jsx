import { useEffect, useState } from "react";
import "./App.scss";
import WeatherDetails from "./WeatherDetails";

function App() {
  const [weather, setWeather] = useState();

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast/daily?q=Paris&cnt=15&units=metric&appid=23e6a177430c319320a45c6676317398"
    )
      .then((response) => response.json())
      .then((response) => {
        let options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        setWeather(
          response.list.map((e) => {
            e.time = new Date(e.dt * 1000).toLocaleDateString("fr-FR", options);
            return e;
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  return (
    <div className="app">
      <div className="app__weather-container">
        {weather?.map((day, index) => {
          return (
            <WeatherDetails
              key={index}
              icon={day.weather[0].icon}
              day={day.time}
              tempMin={day.temp.min}
              tempMax={day.temp.max}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
