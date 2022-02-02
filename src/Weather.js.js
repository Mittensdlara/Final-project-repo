function currentTiming() {
  let p = document.querySelector("#time");
  p.innerHTML = currentTime;
}
let currentTime = new Date();
currentTime.getHours();
currentTime.getDay();
currentTiming();

function showTemperature(response) {
  let tempElem = document.querySelector(".deg");
  let cityElem = document.querySelector("#temp");

  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  tempElem.innerHTML = temperature;
  cityElem.innerHTML = city;
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "27fb8b42ddeb36f74700ba6a216b9ced";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let go = document.querySelector("form");
go.addEventListener("submit", search);
