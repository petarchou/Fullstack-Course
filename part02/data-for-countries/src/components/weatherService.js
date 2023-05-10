const baseUrl = 'https://api.weatherapi.com/v1/current.json';
const apiKey = '2661e8e2339544a1899221414231005';

const getCityWeather = (cityName) => {
    const url = `${baseUrl}?q=${cityName}&key=${apiKey}`;
    return fetch(url)
    .then(response => response.json());
}

const weatherService = {
    getCityWeather,
}

export default weatherService