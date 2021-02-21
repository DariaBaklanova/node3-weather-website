const request = require('request')

const forecast = (latitude,longtitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=aa779a9dc90fb5eeac7c5aec5b859bc0&query="+latitude+","+longtitude+'&units=f';
    request({url:url,json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to forecast service!',undefined)
        } else if(response.body.error){
            callback('Unable to find location. Try another search.',undefined)
        } else {
            callback(undefined,response.body.current.weather_descriptions[0]+ '. It is currently '+response.body.current.temperature+' degrees out. It feels like '+response.body.current.feelslike+' degrees out.')
        }
    })
}

module.exports = forecast