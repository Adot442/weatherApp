import React, { useState } from "react";
import { fetchWeather } from "./services/weather";
import config from "./config";

function Weather() {
  const [zipCode, setInputValue] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [temperature, setTemperature] = useState(null);

  const fetchCoords = async () => {
    if (!zipCode) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.baseURL}/coords?zip=${zipCode}`);
      console.log("API response status:", response);
      if (!response.ok) {
        throw new Error("ZIP code not found");
      }
      const json = await response.json();
      setCoords(json);
    } catch (err) {
      setError(err.message);
      setCoords(null);
    } 
    const {latitude, longitude} = await coords? coords : {latitude: null, longitude: null};
    return {latitude, longitude};
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault(); // Prevent page reload
    console.log("Submitted value:", zipCode);
    // Add your logic here (e.g., API call)
    const {latitude, longitude} = await fetchCoords();
    console.log("coords: ", latitude,longitude);
    const data = await fetchWeather(latitude, longitude);
    console.log("Weather data: ", data);
    setTemperature(data.temperature);
    setLoading(false);
  };

  return (
    <>
        <p>Weather</p>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={zipCode}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter zip code"
        />
        <button type="submit">Submit</button>
        </form>

        {loading && <p>Loading...</p>}

        {!loading && error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && coords && (
            <div>
                <p>City: { coords ? coords.state : "N/A"}</p>
                <p>Latitude: {  coords ? coords.latitude : "N/A"}</p>
                <p>Longitude: {  coords ? coords.longitude : "N/A"}</p>
            </div>
        )}

        {!loading && temperature !== null && (
            <div>
                <p>Temperature: {temperature} °C</p>
            </div>
        )}
    </>
  );
}

export default Weather;