import Axios from "axios";

const URL = 'http://localhost:3003/api/todos'

export const setDescription = event => ({
    type: 'SET_DESCRIPTION',
    payload: event.target.value
});

export const todoSearch = () => {
    const request = Axios.get(`${URL}?sort=createdAt`)
    return {
        type: 'TODO_SEARCH',
        payload: request
    }
}

export const todoAdd = (description) => {
    const request = Axios.post(URL, { description })
    return {
        type: 'TODO_ADD',
        payload: request
    }
}