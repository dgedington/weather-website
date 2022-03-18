const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=69e0c704b58d1aa5ed7e49467e37ef3c&query=${latitude},${longitude}`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Please specify a valid location identifier.', undefined)
        } else {
            const data = {description: body.current.weather_descriptions[0], temperature: body.current.temperature, feelslike: body.current.feelslike} 
            const dataString = `The current condition are ${data.description}. The temperature is ${data.temperature}°C, but it feels like ${data.feelslike}°C`
            callback(undefined, dataString)
        }
    })
}

module.exports = weather