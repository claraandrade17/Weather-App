let now = new Date();

let h3 = document.querySelector("h3");

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}

h3.innerHTML = hours + ":" + minutes;

let h4 = document.querySelector("h4");

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Out",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let date = now.getDate();

h4.innerHTML = month + ", " + day + " " + date;

function citySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-text-input");
  let h5 = document.querySelector("h5");
  h5.innerHTML = input.value;

  search(input.value);
}

function search(city) {
  let apiKey = "92bd618463788378806b4c2a011c3023";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

function displayForecast() {
  let forecastElement = document.querySelector("#weekly-temperature");

  let forecastHTML = `<div class="row">`;
  let week = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  week.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="day">${day}</div>
      <img 
        src="http://openweathermap.org/img/wn/50d@2x.png" 
        alt =""
      />
      <div class="weather">11º</div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = `${temperature}°`;
  document.querySelector("h2").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("h5").innerHTML = response.data.name;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "92bd618463788378806b4c2a011c3023";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

displayForecast();
