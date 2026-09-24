document.getElementById("weatherButton").addEventListener("click", async function () {
    const city = document.getElementById("city").value;
    const units = document.getElementById("units").value;
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.textContent = "Please enter a city.";
        return;
    }

    try {
        // Find the latitude and longitude for the city
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            result.textContent = "City not found.";
            return;
        }

        const location = locationData.results[0];

        // Choose temperature units
        const temperatureUnit =
            units === "fahrenheit" ? "fahrenheit" : "celsius";

        // Get current weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m&temperature_unit=${temperatureUnit}&wind_speed_unit=mph`
        );

        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current.temperature_2m;
        const windSpeed = weatherData.current.wind_speed_10m;
        const symbol = units === "fahrenheit" ? "°F" : "°C";

        result.innerHTML = `
            <h2>${location.name}, ${location.admin1}</h2>
            <p>Temperature: ${temperature}${symbol}</p>
            <p>Wind Speed: ${windSpeed} mph</p>        
        `;

    } catch (error) {
        result.textContent = "Unable to get weather information.";
        console.error(error);
    }
});