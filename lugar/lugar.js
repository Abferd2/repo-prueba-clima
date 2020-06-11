const axios = require('axios');
const apiKey = '30647de01648c99b647ddfc96d646994'
const cityList = require('../cityList/city.list.json');
let requestCity = '';


const convertKtoC = (kelvin) => {
    return (kelvin - 273.15);
}

const city = (obj) => {
    return obj.name.includes(requestCity);
}

const foundCity = async(cityName) => {
    requestCity = cityName;
    let lista = await cityList.filter(city);
    return lista;
}


const getWeather = async(cityName) => {

    let cityId = await foundCity(cityName);

    if (cityId.length === 1) {
        console.log(cityId);
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather?id=${cityId[0].id}&appid=${apiKey}`,
            timeout: 5000,
            headers: {
                'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com',
                'x-rapidapi-key': 'd34580a802msh467613e28727096p1b0532jsn784659e8d6c0'
            }
        });

        const response = await instance.get();

        if (!response.data) {
            throw new Error(`No hay resultados para ${cityName}`);
        } else if (response.data.length === 0) {
            throw new Error(`respuesta vacia- ${cityName}`);
        }
        let weather = `el clima de ${cityName} es ${response.data.weather[0].description}-${response.data.weather[0].description} : temperatura: ${convertKtoC(response.data.main.temp)} °C`;
        return weather;
    } else {
        console.log('ciudades disponibles');
        return cityId;
    }
}

module.exports = {
    getWeather,
    foundCity
}