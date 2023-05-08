const baseUrl = 'https://restcountries.com/v3.1';


const getByName = (name) => {
    const url = `${baseUrl}/name/${name}`
    return fetch(url)
    .then(response => {
        if(response.status === 200) {
            return response.json();
        }
        throw new Error('No countries found.');
    });
}

const countryService = {
    getByName,
}

export default countryService