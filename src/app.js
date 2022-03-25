const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


const app =  express()
const port = process.env.PORT || 3000

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
    res.render('index', {
        title: 'Weather App',
        name: 'Daniel Edington'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        content1: 'This site was created by Daniel Edington as part of a Node.js class.',
        content2: 'It uses data from mapbox.com and weatherstack.com.',
        content3: 'I modified it to use the OpenWeatherMap API to get more free API calls per month.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Daniel Edington',
        content: 'The help page is a lie, you are on your own!'
    })
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
             
            res.send({
                location: placename,
                weather: weatherData,
                address: req.query.address
            })
          })
    }) 
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term.'
        })
    } else {
        res.send({
            product:[]
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404 Error',
        name: 'Daniel Edington',
        content: 'The help article you are looking for was not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        title: '404 Error',
        name: 'Daniel Edington',
        content: 'The page you are looking for was not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})