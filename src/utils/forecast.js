const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=94ad33342725eb420193656d60372aef&query=${lat},${long}&units=m`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect');
        } else if (body.error) {
            callback('There\'s a problem with coordinates');
        } else {   
            const description = `${body.current.weather_descriptions} with a temperature of ${body.current.temperature} degrees`;
            callback(null, {
                current: description
            })
        }
    });
}

module.exports = forecast;