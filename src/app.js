const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


const app =  express()
const port = process.env.PORT

// path definitions for express configuration
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials') 

// setup for handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, placename } = {}) => {
        if(error) {
            return res.send({ error })
        }
    
        weather(latitude, longitude, (error, weatherData) => {
            if(error) {
                return res.send({ error })
            }
            
            const data = { location: placename, weather: weatherData }
            res.send(data)
          })
    }) 
})

app.get('*', (req, res) => {
    res.render('404page')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})