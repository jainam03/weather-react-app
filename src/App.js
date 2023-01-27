import React from 'react';
import { useState } from 'react';
const api = {
  key: '3e64bb558c78b52d3cfbdcb7306f2e73',
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [notFoundError, setNotFoundError] = useState(false)

  const search = evt => {
    if (evt.key === "Enter") {
      try {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery("");
            notFoundError(true)
          })
      } catch (err) {
        // console.log(err);
        alert("error occured")
        setNotFoundError(true);
        notFoundError(false);
        throw err;
      }
    }
  }

  // const search = evt => {
  //   if (evt.key === "Enter") {
  //     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  //       .then(res => {
  //         if (res.status === 404) {
  //           const error = new Error();
  //           alert("No matching location found. Please try searching for a different place.")
  //           throw error;
  //         }
  //       }).catch(e => {
  //         console.log(e);
  //       })
  //       .then(res => res.JSON())
  //       .then(result => {
  //         setWeather(result)
  //         setQuery('')
  //         console.log(result)
  //       })
  //   }
  // }

  // const search = evt => {
  //   if (evt.key === "Enter") {
  //     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  //       .then(res => res.json())
  //       .then(result => {
  //         setWeather(result);
  //         setQuery('');
  //         console.log(result);
  //       });
  //   }
  // }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : (weather.main.temp < 0) ? 'app snow' : 'app') : 'app'}>
      <main>
        <h2 className="h2" >Search for your city, state or country! 👇</h2>
        <div className="search-box" >
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box" >
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box" >
              <div className="temp" >
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather" >{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
