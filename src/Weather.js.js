function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayTemperature(response) {
  let tempElem = document.querySelector("#temperature");
  let cityElem = document.querySelector("#city");
  let descElem = document.querySelector("#description");
  let humidityElem = document.querySelector("#humidity");
  let windElem = document.querySelector("#wind");
  let dateElem = document.querySelector("#date");
  let iconElem = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  tempElem.innerHTML = Math.round(celsiusTemperature);
  cityElem.innerHTML = response.data.name;
  descElem.innerHTML = response.data.weather[0].description;
  humidityElem.innerHTML = response.data.main.humidity;
  windElem.innerHTML = Math.round(response.data.wind.speed);
  dateElem.innerHTML = formatDate(response.data.dt * 1000);
  iconElem.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "27fb8b42ddeb36f74700ba6a216b9ced";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#searching");
form.addEventListener("submit", handleSubmit);

search("Tehran");
