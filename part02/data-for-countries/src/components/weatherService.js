const baseUrl = 'https://api.weatherapi.com/v1/current.json';
const apiKey = process.env.REACT_APP_API_KEY;

const getCityWeather = (cityName) => {
    const url = `${baseUrl}?q=${cityName}&key=${apiKey}`;
    return fetch(url)
    .then(response => response.json());
}

const weatherService = {
    getCityWeather,
}

export default weatherService