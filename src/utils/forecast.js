const request = require('request')

const forecast = (lon, lat, callback)=>{

    const url = "http://api.weatherstack.com/current?access_key=89ecad2fbffc195c8c405f4ac23ee37c&query="+lat+","+lon+"&units=f"
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to a web service',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+ ". It is currently "+body.current.temperature +" degrees out. It feels like "+body.current.feelslike+" degrees out.")
        }
    })
}
module.exports = forecast