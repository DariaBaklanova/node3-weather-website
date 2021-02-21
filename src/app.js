const path= require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { constants } = require('buffer')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handler engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is help',
        title: 'Help',
        name: 'Andew'

    })
})

app.get('/weather',(request,response)=>{

    if(!request.query.address){
        return response.send({
            error: "You must provide an address!"
        })
    } 

    geocode(request.query.address, (error,{latitude,longtitude,location}={})=>{
        if (error){
            return response.send({error});
        }
        forecast(latitude,longtitude,(error, forecastResponse)=>{
            if (error){
                return console.log(error);
            }
            return response.send({
                location,
                forecastResponse,
                
            })

        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search!"
        })
    } 
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Andrew',
        errorMessage: 'Help Article not found.'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Andrew',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})