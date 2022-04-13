const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (response.error) {
            callback('Please specify a valid location identifier.', undefined)
        } else {

            const icon = `http://openweathermap.org/img/wn/${response.body.weather[0].icon}@2x.png`
            const data = {description: response.body.weather[0].description, temperature: response.body.main.temp, feelslike: response.body.main.feels_like, humidity: response.body.main.humidity, icon: icon, pressure: response.body.main.pressure } 
            
            // const dataString = `The current condition are ${data.description}. The temperature is ${data.temperature}°C, but it feels like ${data.feelslike}°C and the humidity is ${data.humidity}%`
            callback(undefined, response.body)
        }
    })
}

module.exports = weather