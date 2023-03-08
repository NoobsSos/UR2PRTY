const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: 'nerWt8xCZAkFNGuJUjIqJOjlEMLkM343',
    formatter: null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
