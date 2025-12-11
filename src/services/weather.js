import config from "../config";

export async function fetchWeather(lat, lon) {
  try {
    const queryParams = new URLSearchParams({
      lat: lat || 40.7128, // Default to New York latitude
      lon: lon || -74.0060, // Default to New York longitude
    });

    const response = await fetch(`${config.baseURL}/weather?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}