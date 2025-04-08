import React, { useEffect, useState } from 'react';
import './WeatherSidebar.css';

const WeatherSidebar = () => {
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);   // Weather data returned from API
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (city.trim() === '') return;

    const timer = setTimeout(() => {
      const fetchWeather = async () => {
        try {
          setError('');
          // Fetch weather data from API if city length is 3 or more characters
          if (city.length >= 3) {
            const encodedCity = encodeURIComponent(city);
            const res = await fetch(
              `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodedCity}`
            );
            if (!res.ok) throw new Error('City not found');
            const data = await res.json();
            setWeather(data);
          } else {
            setWeather(null); 
          }
        } catch (err) {
          setWeather(null);
          setError(err.message);
        }
      };

      fetchWeather();
    }, 500); 

    // Clear the timeout if city changes before 500ms
    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div className="weather-info fade-in">
    <div className="weather-sidebar p-3 border rounded">
    {/* Show weather info if available */}
      <h5 className="mb-3">Weather Info</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {error && <p className="text-danger">{error}</p>}

      {weather && weather.current && (
        <div className="mt-2">
          <h6>{weather.location.name}, {weather.location.country}</h6>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
          />
          <p><strong>{weather.current.condition.text}</strong></p>
          <p>Temp: {weather.current.temp_c} °C (Feels like {weather.current.feelslike_c}°C)</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_kph} km/h {weather.current.wind_dir}</p>
          <p>Cloud cover: {weather.current.cloud}%</p>
          <p>Updated at: {weather.current.last_updated}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default WeatherSidebar;
