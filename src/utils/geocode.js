const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2luaXN0ZXJibGF5ZGUiLCJhIjoiY2wwcGplMG1rMjBydDNla2N5OWszcXA0ZCJ9.zqzRwLdREOAGDykaVBupWg&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geolocation service.', undefined)
        } else if (body.features.length === 0) {
            callback('Location data not found.', undefined)
        } else {
            const data = body.features
            callback(undefined, {placename: data[0].place_name, latitude: data[0].center[1], longitude: data[0].center[0]})
        }
    }
    
    )}

    module.exports = geoCode