import React, { useContext } from "react";
import { Geoapify } from "../Context/Geoapify";
const WeatherDisplay = () => {
  const { forecast } = useContext(Geoapify);

  return (
    <div className="weather container my-5 d-flex justify-content-center">
      <div className="row w-100 d-flex justify-content-center">
        {forecast.length > 0 ? (
          forecast.map((item, index) => (
            <div
              key={index}
              className="weather-info col-12 col-sm-6 col-lg-4 mb-4 d-flex align-items-stretch justify-content-center"
            >
              <div className="card border-0 shadow-sm">
                <img
                  src={item.image}
                  alt={item.weather[0]}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{item.date}</h5>
                  <p className="card-text">Time: {item.time}</p>
                  <p className="card-text">Temperature: {item.temp}°C</p>
                  <p className="card-text">Weather: {item.weather[0]}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;
