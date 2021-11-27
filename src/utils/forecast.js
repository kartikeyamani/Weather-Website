const request=require('request')

const forecast=(latitude,longitude,location,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=23f84ec6ab6b4899ff5071a38b010b84&query="+latitude+","+longitude

    request({ url, json: true }, (error, {body}) => {

    if(error){
        callback('Unable to fetch the request',undefined)
    }
    else if(body.error){
        
        callback('Enter the correct location',undefined)
    }
    else{
        callback(undefined,{
            temperature:body.current.temperature,
            weather_descriptions:body.current.weather_descriptions[0],
            humidity:body.current.humidity,
            location:location,
            feelslike:body.current.feelslike,
            atmospheric_pressure:body.current.pressure
        })
    }
 })
}


module.exports=forecast