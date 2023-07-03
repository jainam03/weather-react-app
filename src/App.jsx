import React, { useState } from 'react';

const api = {
  key: '3e64bb558c78b52d3cfbdcb7306f2e73',
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [notFoundError, setNotFoundError] = useState(false);

  const handleSearch = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("No matching location found. Please try searching for a different place.");
        }   
        return res.json();
      })
      .then(result => {
        setWeather(result);
        setQuery("");
        setNotFoundError(false);
      })
      .catch(err => {
        console.error(err);
        setNotFoundError(true);
      });
  };

  const clearAll = () => {
    window.location.reload()

  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div className={`app ${typeof weather.main !== "undefined" ? (weather.main.temp > 16 ? 'warm' : 'snow') : ''}`}>
      <main>
        <h2 className="h2">Search for your city, state or country! 👇</h2>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className='button-container'>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          <button className='clear-button' onClick={clearAll}>Clear all</button>
          </div>
        </div>
            {notFoundError && (
              <div className="error-box">
                City not found. Please enter a valid city name.
              </div>
            )}
        {typeof weather.main !== "undefined" && (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="feels-like">{`Feels like: ${Math.round(weather.main.feels_like)}°C`}</div>
              <div className='wind-speed' >{`Wind speed: ${weather.wind.speed} meters/sec`}</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        )}
      {/* <h3>Made with 💙 using React JS</h3> */}
      </main>
    </div>
  );
}

export default App;



//previous functions
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


