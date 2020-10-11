import React, { useState } from "react";

import { fetchData } from "./api/fetchData";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weatherState, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchData(query);

      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {/* {weather.main && (
        <div className="message">
          <h2 classNmae="message-text">
            <span>{weather}</span>
          </h2>
        </div>
      )} */}
      {weatherState.weather && (
        <div className="message">
          <p>Weather:</p>
          Id: <span>{weatherState.weather.records[0].climate.id}</span>
          <br />
          Message:{" "}
          <span>{weatherState.weather.records[0].climate.message}</span>
        </div>
      )}
    </div>
  );
};

export default App;
