const request = require('request')
const geocode = (address, callback)=>
{
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hhaHVscml5YXoiLCJhIjoiY2tsbnl4eHVlMG5yYjJ2bjNicHA2bHM1MCJ9.ZdcsEYsmW304IJJQK-H6sg&limit=1`
    request({url,json: true},(error, {body})=>
    {
        if(error)
        {
            callback('Unable to connect to weather stack. Please check your network connectivity',undefined)
        }
        else if(body.features.length === 0)
        {
            callback(`The location is not available`,undefined)
        }
        else
        {
            const lat = body.features[0].center[1]
            const lon = body.features[0].center[0]
            //callback(undefined,`The Place is ${response.body.features[0].place_name} and the latitude is ${lat} and longitude is ${lon}`)
            callback(undefined,{
                place: body.features[0].place_name,
                latitude: lat,
                longitude: lon
            })
        }

    })
}
module.exports.geocode = geocode