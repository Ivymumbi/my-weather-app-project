function displayTemperature(response) {
  let temperature = document.querySelector("#current-value");
  temperature.innerHTML = Math.round(response.data.temperature.current);
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let city = searchInputElement.value;
  let apiKey = "f1fc0cc94o4ea1c9e211223ba7t05bc1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  cityElement.innerHTML = city;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

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
