require('dotenv').config()
const weatherToken = process.env.WEATHER_API_TOKEN;
const fetch = require('node-fetch');
const telegram = require('node-telegram-bot-api');
const bot = new telegram(process.env.TELEGRAM_TOKEN);

const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
weatherUrl.searchParams.set('q', 'Lajes Pintadas, BR');
weatherUrl.searchParams.set('APPID', weatherToken);

const getWeatherData = async() => {
    const resp = await fetch(weatherUrl.toString());
    const body = await resp.json();
    return body;
}

const generateWeatherMessage = weatherData =>
    `The Weather data in ${weatherData.name}: ${weatherData.weather[0].description}. Current\
 Temperature is ${convertCelcius(weatherData.main.temp)}, with a low temp of \
 ${convertCelcius(weatherData.main.temp_min)} and high of ${convertCelcius(weatherData.main.temp_max)} and air humidity is in\
 ${weatherData.main.humidity}.`

const convertCelcius = data => `${(data - 273.15).toFixed(2)}°С `

const main = async() => {
    const weatherData = await getWeatherData();
    const weatherString = generateWeatherMessage(weatherData);
    console.log(weatherData);
    console.log(weatherString);
    bot.sendMessage(process.env.CHAT_ID, weatherString);
}

main();