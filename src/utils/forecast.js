const request = require("request");
const weatherreport = (access_key, latitude, lon, u, callback) =>
{
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${latitude},${lon}&units=${u}`
    request({url,json:true},(error, {body})=>
    {
        if(error)
        callback('Unable to connect to weather stack',undefined)
        else if(body.error)
        callback(body.error.info,undefined)
        else
        callback(undefined,`The weather forecast is ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress outside. It feels like ${body.current.feelslike} degree out.`)
    })
}
module.exports.weatherreport = weatherreport