const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=b0584c239743dfe6b0204991c1686ef8&query="+latitude+", "+longitude
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback("Unable to connect weather server!", undefined)
        }else if(body.error){
            callback("Unable to find location. Try another search!", undefined)
        }else{
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature +' degrees out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast