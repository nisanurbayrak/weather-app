// App.js
import React, { useState } from "react";
import "./App.css";
import { GeoapifyProvider } from "./Context/Geoapify";
import WeatherDisplay from "./Components/WeatherDisplay";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    if (inputValue.trim() === "") {
      setErrorMessage("Input value is empty");
      return;
    }

    const api = {
      key: "fac90bacadc8b0372f10fe35a46f6df8",
      base: "https://api.openweathermap.org/data/2.5/",
    };

    try {
      const response = await fetch(
        `${api.base}weather?q=${inputValue}&appid=${api.key}`
      );
      if (response.ok) {
        setCity(inputValue);
        setErrorMessage("");
        console.log("City set to:", inputValue);
      } else {
        alert("City not found. Please enter a valid city.");
      }
    } catch (error) {
      setErrorMessage("Error fetching city data. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App bg-light p-5 min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="container bg-white p-4 rounded shadow-lg">
        <GeoapifyProvider city={city}>
          <h1 className="text-center mb-4">Weather Application</h1>
          <div className="input-group mb-3">
            <input
              className="form-control"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter a city"
            />
            <button onClick={handleClick} className="btn btn-primary">
              Search
            </button>
          </div>
          {city === "" ? (
            <h2 className="text-center">Your current location</h2>
          ) : (
            <h2 className="text-center">
              The location you are looking for: {city}
            </h2>
          )}
          <WeatherDisplay />
        </GeoapifyProvider>
      </div>
    </div>
  );
}

export default App;
