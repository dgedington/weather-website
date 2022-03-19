const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d085cf2a073adf7af5739b16f1ebeae2&units=metric`
    // const url = `http://api.weatherstack.com/current?access_key=69e0c704b58d1aa5ed7e49467e37ef3c&query=${latitude},${longitude}`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (response.error) {
            callback('Please specify a valid location identifier.', undefined)
        } else {
            const data = {description: response.body.weather[0].description, temperature: response.body.main.temp, feelslike: response.body.main.feels_like, humidity: response.body.main.humidity} 
            
            const dataString = `The current condition are ${data.description}. The temperature is ${data.temperature}°C, but it feels like ${data.feelslike}°C and the humidity is ${data.humidity}%`
            callback(undefined, dataString)
        }
    })
}

module.exports = weather