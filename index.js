require('dotenv').config()
const weatherToken = process.env.WEATHER_API_TOKEN;
const fetch = require('node-fetch');

const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
// weatherUrl.searchParams.set('zip', '78747,us');
weatherUrl.searchParams.set('q', 'London,uk');

weatherUrl.searchParams.set('APPID', weatherToken);

// weatherUrl.searchParams.set('units', '');

const getWeatherData = async() => {
    const resp = await fetch(weatherUrl.toString());
    const body = await resp.json();
    return body;
}

const main = async() => {
    const weatherData = await getWeatherData();
    console.log(weatherData);
    console.log((weatherData.main.temp - 273, 15));

}

main();