const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

//const of weather icons
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(`/.netlify/functions/weather?city=${city}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else if (response.status == 200) {
    document.querySelector(".error").style.display = "none";
  }

  const data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
  document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + 'km/h';

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "./static/images/cloudy.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "./static/images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "./static/images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "./static/images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "./static/images/mist.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  weather.style.display = "block";
});

searchBox.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});
