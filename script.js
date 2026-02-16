const apikey = "60dac291c00a698e06c05435d1938d02";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city){
  if(!city) return;

  const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apikey}`);

  if(response.status === 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();

  document.querySelector(".description").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if(data.weather[0].main == "Clouds"){
    document.querySelector(".weather-icon").src = "images/clouds.png";
  }
  else if(data.weather[0].main == "Clear"){
    document.querySelector(".weather-icon").src = "images/clear.png";
  }
  else if(data.weather[0].main == "Rain"){
    document.querySelector(".weather-icon").src = "images/rain.png";
  }
  else if(data.weather[0].main == "Drizzle"){
    document.querySelector(".weather-icon").src = "images/drizzle.png";
  }
  else if(data.weather[0].main == "Mist"){
    document.querySelector(".weather-icon").src = "images/mist.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    checkWeather(searchBox.value.trim());
  }
});
