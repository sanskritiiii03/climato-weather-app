import "./style.css";

const apiKey = import.meta.env.VITE_WEATHER_API;
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");

searchButton.addEventListener("click", () => {
	const city = cityInput.value.trim();
	if (city !== "") {
		fetchWeatherData(city);
	}
});

cityInput.addEventListener("keypress", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		const city = cityInput.value.trim();
		if (city !== "") {
			fetchWeatherData(city);
		}
	}
});

async function fetchWeatherData(city) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
		);
		if (!response.ok) {
			throw new Error(`Http error: ${response.status}`);
		}
		const data = await response.json();

		displayWeatherData(data);
	} catch (error) {
		console.error("Error:", error);
	}
}

function displayWeatherData(data) {
	if (data.cod === "404") {
		weatherDisplay.textContent = "City not found";
		return;
	}

	weatherDisplay.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].main}</p>
  `;
}
