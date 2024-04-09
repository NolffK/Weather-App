// Get your API key from WeatherAPI.com and replace 'YOUR_API_KEY' with it
const apiKey = "75f0fe45bb3149cc8e6221617240904";

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to update the weather information in the HTML
function updateWeather(weatherData) {
  const weatherDiv = document.getElementById("weather-info");
  weatherDiv.innerHTML = `
        <h2>${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}</h2>
        <p>Temperature: ${weatherData.current.temp_c}°C</p>
        <p>Condition: ${weatherData.current.condition.text}</p>
        <img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">
    `;
}
// Function to fetch forecast data
async function fetchForecast(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes&alerts=yes`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

// Function to update the forecast information in the HTML
function updateForecast(forecastData) {
  const forecastDiv = document.getElementById("forecast-info");
  let forecastHTML = `<h2>Forecast for ${forecastData.location.name}, ${forecastData.location.region}, ${forecastData.location.country}</h2>`;

  // Start iterating from the second day in the forecast data array
  forecastData.forecast.forecastday.slice(1, 8).forEach((day) => {
    const date = new Date(day.date);
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);

    forecastHTML += `
            <div>
                <h3>${dayOfWeek}, ${day.date}</h3>
                <p>Max Temperature: ${day.day.maxtemp_c}°C, Min Temperature: ${day.day.mintemp_c}°C</p>
                <p>Condition: ${day.day.condition.text}</p>
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>`;
  });

  forecastDiv.innerHTML = forecastHTML;
}

// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const weatherData = await fetchWeather(city);
  updateWeather(weatherData);
  const forecastData = await fetchForecast(city);
  updateForecast(forecastData);
}

// Event listener for form submission
document
  .getElementById("weather-form")
  .addEventListener("submit", handleSubmit);
