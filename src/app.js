const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherreport = require('./utils/forecast')

const app = express()

//declaration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const name = 'Shahul Riyaz'

//handlebars
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Static page
app.use(express.static(publicDirectoryPath))

//index page
app.get('', (req,res)=>
{
    res.render('index',{
        title: 'Weather',
        name
    })
})

//about page
app.get('/about',(req,res)=>
{
    res.render('about',{
        title : 'About me',
        name
    })
})

//help page
app.get('/help',(req,res)=>
{
    res.render('help', {
        title: 'Help',
        message: 'How can i help you?',
        name
    })
})

//weather page
app.get('/weather',(req,res)=>
{   const address = req.query.address
    if(!req.query.address)
    {
        return res.send(
            {
                error: 'you must provide address' 
            }
        )
    }
geocode.geocode(address, (error, {latitude, longitude, place}={}) =>
{
    if(error)
    {
       return res.send(
           {
               error: error
           }
       )
    }
        weatherreport.weatherreport('b532a2b21ce2d95c6f04d1d02800b985',latitude,longitude,'f',(error,fdata)=>
        {
            if(error)
            {
                return res.send(
                    {
                        error: error
                    }
                )
            }
                return res.send(
                    {
                        forecast: fdata,
                        location:place,
                        address:address                        
                    }
                )
            
               
        })  
})
})

//Help Page not found
app.get('/help/*',(req,res)=>{
    res.render('404', 
    {
        title: 'Help Section not found'
    })
})

//Sample Products
app.get('/Products',(req,res)=>{
    console.log(req.query)
    res.send(
        {
            products:[
                {
                    item: 1
                },
                {
                    item : 2
                }
            ],
        }
    )
})
//404 Page
app.get('*',(req,res)=>
{
    res.render('404',
    {
        title : '404 page not found',
        name
    }
    )
})
//app listener
app.listen(3000,()=>
{
    console.log('The server is running')
})