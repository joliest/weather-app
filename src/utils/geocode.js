const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoiam9sdnIyMSIsImEiOiJjazl6Yjl5cHUxNHR5M21tcjB6c2Ezb2I4In0.ADARCg_4ktnGksl2DaoKuA&limit=1`;

    request({url: url, json: true}, (error, {body}) => {
        const {features} = body;
        if (error) {
            callback('Unable to connect to location services');
        } else if (features.length === 0) {
            callback(`Unable to find location ${address}`);
        } else {
            callback(null, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name,
            });
        }
    });
}

module.exports = geocode;