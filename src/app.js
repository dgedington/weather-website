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
        name: 'Daniel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Daniel',
        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum consequuntur vel voluptatem distinctio, voluptatum quaerat quod. Voluptatum, ducimus pariatur. Dolorum, quam saepe? Perferendis, quia dolorem hic tenetur, illum veniam repellat fuga sit iste cupiditate at sunt ullam deleniti doloribus dicta velit culpa, eaque adipisci exercitationem magnam! Assumenda similique possimus doloribus molestias. Aliquid qui voluptatum maiores, fugit nostrum odio assumenda asperiores. Beatae atque quo, sit est voluptatem nobis dolorum fugit nisi quibusdam excepturi ea natus explicabo amet. Laboriosam adipisci, autem, debitis fugiat repudiandae optio, dolore dolorum minus doloremque repellendus velit nesciunt necessitatibus tenetur suscipit inventore. Eius libero sapiente id iusto sed. Harum reiciendis, nam sunt voluptates ratione placeat eligendi! Consectetur nostrum, facere totam, eligendi consequuntur doloremque incidunt corporis ad maiores temporibus impedit ipsam praesentium excepturi perferendis minus. Non dicta voluptatibus, voluptate enim inventore neque, in aut nemo saepe debitis iure, repellendus minima eaque illo suscipit! Perspiciatis eveniet sed dignissimos corporis hic repellendus debitis officiis blanditiis praesentium voluptate laborum in nostrum similique optio, aliquid eaque reprehenderit ullam nihil commodi voluptatem omnis dolorem eligendi? Velit veritatis omnis sit adipisci aspernatur, beatae natus. Quia sit voluptatum odit tempore iure itaque aspernatur autem quod tenetur eaque. Vitae eveniet rerum, cum officiis maxime cumque odio mollitia.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Daniel',
        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum consequuntur vel voluptatem distinctio, voluptatum quaerat quod. Voluptatum, ducimus pariatur. Dolorum, quam saepe? Perferendis, quia dolorem hic tenetur, illum veniam repellat fuga sit iste cupiditate at sunt ullam deleniti doloribus dicta velit culpa, eaque adipisci exercitationem magnam! Assumenda similique possimus doloribus molestias. Aliquid qui voluptatum maiores, fugit nostrum odio assumenda asperiores. Beatae atque quo, sit est voluptatem nobis dolorum fugit nisi quibusdam excepturi ea natus explicabo amet. Laboriosam adipisci, autem, debitis fugiat repudiandae optio, dolore dolorum minus doloremque repellendus velit nesciunt necessitatibus tenetur suscipit inventore. Eius libero sapiente id iusto sed. Harum reiciendis, nam sunt voluptates ratione placeat eligendi! Consectetur nostrum, facere totam, eligendi consequuntur doloremque incidunt corporis ad maiores temporibus impedit ipsam praesentium excepturi perferendis minus. Non dicta voluptatibus, voluptate enim inventore neque, in aut nemo saepe debitis iure, repellendus minima eaque illo suscipit! Perspiciatis eveniet sed dignissimos corporis hic repellendus debitis officiis blanditiis praesentium voluptate laborum in nostrum similique optio, aliquid eaque reprehenderit ullam nihil commodi voluptatem omnis dolorem eligendi? Velit veritatis omnis sit adipisci aspernatur, beatae natus. Quia sit voluptatum odit tempore iure itaque aspernatur autem quod tenetur eaque. Vitae eveniet rerum, cum officiis maxime cumque odio mollitia.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    console.log(req.query.address)
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
        console.log(req.query)
        res.send({
            product:[]
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404 Error',
        name: 'Daniel',
        content: 'The help article you are looking for was not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        title: '404 Error',
        name: 'Daniel',
        content: 'The page you are looking for was not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})