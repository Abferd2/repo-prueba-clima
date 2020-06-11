const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'direccion de la cuidad',
        demand: true
    }
}).argv;
const lugar = require('./lugar/lugar.js');

let cityName = argv.direccion;
console.log(cityName);
//lugar.foundCity(argv.direccion);

lugar.getWeather(cityName).then((resp) => {
    console.log(resp);
});