import { useEffect, useState } from "react";
import "./App.scss";
import WeatherDetails from "./WeatherDetails";

function App() {
  const [weather, setWeather] = useState();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?q=Paris&cnt=15&units=metric&appid=${import.meta.env.VITE_API_KEY}`
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

  return (
    <div className="app">
      <div className="weather-container">
        {weather?.map((day, index) => {
          return (
            <WeatherDetails
              key={index}
              icon={day.weather[0].icon}
              day={day.time.split(", ").join(" ").split(" ")}
              tempMin={Math.round(day.temp.min)}
              tempMax={Math.round(day.temp.max)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
