import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts';

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data);
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

const contactsService = {
    getAll,
    create,
    update,
}

export default contactsService