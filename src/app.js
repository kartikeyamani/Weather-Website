const express=require('express')
const path=require('path')
const hbs=require('hbs')
const forecast=require('/Node/web-server/src/utils/forecast')
const geocode=require('/Node/web-server/src/utils/geocode')

const app=express()

const publicdirectory=path.join(__dirname,'../public')
const partialpath=path.join(__dirname,'/partials')
// console.log(partialpath)

//Setting up static files to serve to its directory
app.use(express.static(publicdirectory))
app.set('view engine','hbs')
hbs.registerPartials(partialpath)
 


app.get('',(req,res)=>{

    res.render('index',{
        name:"Weather App",
        age:27
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:"About page",
        age:27
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        name:"Help page",
        age:27
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:"Please Provide the correct address"});
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
        forecast(latitude,longitude,location,(error,{temperature, weather_descriptions,humidity}={})=>{
            if(error){
                return res.send(error)
            }
            res.send({
               Temperature:temperature,
               Weather: weather_descriptions,
               Humidity:humidity,
               Location:location
            })
        })
    })
})
// app.get('/products',(req,res)=>{
//     //This req.query.search is used to get the value of query that the user has asked for!
//    if(!req.query){
//      return  res.send("No search term entered")
//    }
//     res.send({
//         products:[]
//     })
// })
app.get('/help/*',(req,res)=>{
    res.render('Error',{
        status:404,
        message:"Page Not found in Help article"
    })
})
app.get('*',(req,res)=>{
    res.render('Error',{
        status:404,
        message:"Page Not found"
    })
})






// app.get('/help',(req,res)=>{
//     res.send("Help page!")
// })
// app.get('/about',(req,res)=>{
//     res.send("<title>It's Title</title>")
// })
// app.get('/weather',(req,res)=>{
//     res.send({
//         location:"hyderabad",
//         forecast:"dizzy"
//     })
// })



app.listen(3000,()=>{
    console.log("server is upon port 3000")
})