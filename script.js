const apiKey = '405e532667cc35d75a976e14e2bfdddc'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        getWeatherByLocation(location);
    } else {
        alert('Please enter a location');
    }
});

function getWeatherByLocation(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const description = data.weather[0].description;
    const temperature = `Temperature: ${data.main.temp} °C`;
    const humidity = `Humidity: ${data.main.humidity} %`;
    const wind = `Wind Speed: ${data.wind.speed} m/s`;

    document.getElementById('weatherLocation').innerText = location;
    document.getElementById('weatherDescription').innerText = description;
    document.getElementById('weatherTemperature').innerText = temperature;
    document.getElementById('weatherHumidity').innerText = humidity;
    document.getElementById('weatherWind').innerText = wind;
}

// Optional: Get weather data based on user's current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    });
}
