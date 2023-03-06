const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "49cc8c821cd2aff9af04c9f98c36eb74";

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.current.weather[0].main);
        showWeatherData(data);
            if(data.current.weather[0].main == 'Clouds')
            document.body.style.backgroundImage = "url(images/cloudy.jpg)"; 
            if(data.current.weather[0].main == 'Rain')
            document.body.style.backgroundImage = "url(images/rainy.jpg)"; 
            if(data.current.weather[0].main == 'Sunny')
            document.body.style.backgroundImage = "url(images/sunny3.jpg)"; 
            if(data.current.weather[0].main == 'Snow')
            document.body.style.backgroundImage = "url(images/snow.jpg)"; 
            if(data.current.weather[0].main == 'Thunder')
            document.body.style.backgroundImage = "url(images/snow.jpg)"; 
            if(data.current.weather[0].main == 'Mist')
            document.body.style.backgroundImage = "url(images/mist.jpg)";
           

        const searchBtn = document.getElementById("btn");
        // console.log(searchBtn)
        searchBtn.addEventListener("click", findWeather);
        function findWeather() {
          const cityName = document.getElementById("search").value;

          if (cityName !== "" || cityName !== undefined) {
            console.log(cityName);

            fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);

                if(data.weather[0].main == 'Clouds')
                document.body.style.backgroundImage = "url(images/cloudy.jpg)"; 
                if(data.weather[0].main == 'Rain')
                document.body.style.backgroundImage = "url(images/rainy.jpg)"; 
                if(data.weather[0].main == 'Sunny')
                document.body.style.backgroundImage = "url(images/sunny3.jpg)"; 
                if(data.weather[0].main == 'Snow')
                document.body.style.backgroundImage = "url(images/snow.jpg)"; 
                if(data.weather[0].main == 'Thunderstorm')
                document.body.style.backgroundImage = "url(images/snow.jpg)"; 
                if(data.weather[0].main == 'Mist')
                document.body.style.backgroundImage = "url(images/mist.jpg)"; 

                let lati = data.coord.lat;
                let loni = data.coord.lon;
                fetch(
                  `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${loni}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    showWeatherData(data);
                  });
              });
          }
        }
      });
  });
}

function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + "N " + data.lon + "E";

  currentWeatherItemsEl.innerHTML = `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    `;

  let otherDayForcast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
              
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>

            `;
    } else {
      otherDayForcast += `
            <div class="weather-forecast-item">
               
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `;
    }
  });

  weatherForecastEl.innerHTML = otherDayForcast;
}
