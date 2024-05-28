const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { city } = event.queryStringParameters;
  const API_KEY = process.env.API_KEY;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' }),
    };
  }
};
