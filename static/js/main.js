const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(`/.netlify/functions/weather?city=${city}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    if (response.status === 200) {
      document.querySelector(".error").style.display = "none";

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
      document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
      document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + 'km/h';

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "./static/images/cloudy.png";
          break;
        case "Clear":
          weatherIcon.src = "./static/images/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "./static/images/rain.png";
          break;
        case "Drizzle":
          weatherIcon.src = "./static/images/drizzle.png";
          break;
        case "Mist":
          weatherIcon.src = "./static/images/mist.png";
          break;
        default:
          weatherIcon.src = "./static/images/clear.png";
      }

      weather.style.display = "block";
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});
