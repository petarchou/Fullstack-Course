import axios from 'axios'

const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data);
}

const getByName =(name) => {
    name = name.split(' ').join('+');
    const url = `${baseUrl}?name=${name}`;
    
    return axios.get(url)
    .then(response => response.data[0]);
}

const create = (newContact) => {
    return axios.post(baseUrl, newContact)
        .then(response => response.data);
}

const update = (id, newContact) => {
    const url = `${baseUrl}/${id}`
    return axios.put(url, newContact)
        .then(response => response.data);
}

const remove = (id) => {
    const url = `${baseUrl}/${id}`
    return axios.delete(url)
    .then(response => response.data);
}

const contactsService = {
    getAll,
    getByName,
    create,
    update,
    remove,
}

export default contactsService