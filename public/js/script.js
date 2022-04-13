let weather = {
  fetchWeather: function (city) {
    fetch('/weather?address=' + city)
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.")
          throw new Error("No weather found.")
        }
        return response.json()
      })
      .then((data) => {
        this.displayWeather(data)
      })
},
  displayWeather: function (data) {
    const { location } = data
    const name = location.split(',')
    const { icon, description } = data.weather.weather[0]
    const { temp, humidity, pressure, feels_like } = data.weather.main
    const { speed } = data.weather.wind
    document.querySelector(".city").innerText = location
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector(".description").innerText = description
    document.querySelector(".temp").innerText = temp + "°F" 
    document.querySelector(".feels_like").innerText = "Feels Like: " + feels_like + "°F"
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%"
      document.querySelector(".pressure").innerText =
      "Pressure: " + pressure + " hPa"  
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " mi/h"
    document.querySelector(".weather").classList.remove("loading")
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + encodeURIComponent(name[0]) + "')"
    document.querySelector(".search-bar").value = ""
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value)
  }
}

document.querySelector(".search button").addEventListener("click", function () {
  weather.search()
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search()
    }
})