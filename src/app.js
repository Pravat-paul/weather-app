const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

// Define express view engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialsPath)

// Define express static directory
app.use(express.static(publicPathDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pravat paul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Pravat paul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pravat paul'
    })
})

app.get('/weather', (req, res) => {
    if( !req.query.address ){
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if( error ){
            return res.send({ error })
        }
        else{

            forecast(longitude, latitude, (error, forecastData) => {
                if( error ){
                    return res.send({ error })
                }
                else{
                    res.send({
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Page not found!',
        name: 'Pravat paul'
    })
})

app.listen(port, () => {
    console.log("Server listning on port : " + port)
})