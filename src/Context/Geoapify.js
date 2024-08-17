import { createContext, useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import clear from "../Assets/clear.png";
import snow from "../Assets/snow.png";
import clouds from "../Assets/cloud.png";
import rainy from "../Assets/rainy.png";
// Context oluşturma
const Geoapify = createContext();

// Provider bileşeni oluşturma
const GeoapifyProvider = ({ children, city }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [forecast, setForecast] = useState([]);

  const values = {
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    city,
    forecast,
  };

  const api = {
    key: "fac90bacadc8b0372f10fe35a46f6df8",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  // şehir girilmediğinde çalışır
  useEffect(() => {
    if (city === "" && latitude == null && longitude == null) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, [latitude, longitude, city]);

  const getWeatherImage = (description) => {
    switch (description.toLowerCase()) {
      case "clear":
        return clear;
      case "rain":
        return rainy;
      case "snow":
        return snow;
      case "clouds":
        return clouds;
      default:
        return clear; // Default image
    }
  };

  useEffect(() => {
    const fetchWeatherData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        const newForecast = data.list.map((item) => {
          const dateObject = parseISO(item.dt_txt);
          const formattedDate = format(dateObject, "d MMM, EEE", {
            locale: enUS,
          });

          return {
            temp: item.main.temp,
            weather: [item.weather[0].main, item.weather[0].description],
            date: formattedDate,
            time: format(dateObject, "HH:mm:ss"),
            image: getWeatherImage(item.weather[0].main), // Görseli ekleyin
          };
        });
        setForecast(newForecast);
      } catch (error) {
        console.error(error);
      }
    };

    if (latitude && longitude && city === "") {
      fetchWeatherData(
        `${api.base}forecast?lat=${latitude}&lon=${longitude}&cnt=7&appid=${api.key}&units=metric`
      );
    } else if (city !== "") {
      fetchWeatherData(
        `${api.base}forecast?q=${city}&cnt=7&appid=${api.key}&units=metric`
      );
    }
  }, [latitude, longitude, city]);

  return <Geoapify.Provider value={values}>{children}</Geoapify.Provider>;
};
export { Geoapify, GeoapifyProvider };
