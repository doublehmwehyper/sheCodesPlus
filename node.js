let city = document.querySelector(".city");
let temperature = document.querySelector(".temp");
let search = document.querySelector("#search");
let current = document.querySelector("#current");
let input = document.querySelector("#input");
let apiKey = "9764adca81e73abc4c440c7b3573baa2";

const apiFetch = (url) => {
  axios
    .get(url)
    .then(function (response) {
      temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
      city.innerHTML = response.data.name;
    })
    .catch((err) => alert(err.response.data.message));
};

function showCurrentTemp() {
  city.innerHTML = input.value.toLowerCase();

  function showTemperature(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    apiFetch(url);
  }

  navigator.geolocation.getCurrentPosition(showTemperature);
}

function showCityTemp() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;

  if (input.value.length > 0) {
    apiFetch(url);
  } else {
    alert("Please enter city name!");
  }
}

current.addEventListener("click", showCurrentTemp);
search.addEventListener("click", showCityTemp);
