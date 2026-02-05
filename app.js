function displayTemperature(response) {
  let temperature = document.querySelector("#current-value");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let currentIconElement = document.querySelector("#current-icon");

  currentIconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"class = "current-icon"
    />`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}Km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;

  getForecast(response.data.city);
}
function searchCity(city) {
  let apiKey = "f1fc0cc94o4ea1c9e211223ba7t05bc1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");

  searchCity(searchInputElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response);
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div>
        <img src="${day.condition.icon_url}"class="weather-forecast-icon" /></div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°
</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°
</div>
        </div>
      </div>
    </div>
  `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "f1fc0cc94o4ea1c9e211223ba7t05bc1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Nairobi");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day},${hours}:${minutes}`;
