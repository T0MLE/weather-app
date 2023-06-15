import { useEffect, useState } from "react";
import "./App.css";

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
    <div className="App">
      <div>
        {weather?.map((day, index) => {
          return (
            <div key={index}>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt=""
              />
              <p>{day.time}</p>
              <p>{day.temp.max}</p>
              <p>{day.temp.min}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
