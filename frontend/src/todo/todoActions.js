import Axios from "axios";

import { SET_DESCRIPTION, TODO_SEARCH, TODO_CLEAR } from './actionTypes';

const URL = 'http://localhost:3003/api/todos'

export const setDescription = event => ({
    type: SET_DESCRIPTION,
    payload: event.target.value
});

export const todoSearch = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description;
        const search      = description ? `&description__regex=/${description}/` : '';
        
        Axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({ type: TODO_SEARCH, payload: resp.data }));
    }
}

export const todoAdd = (description) => {
    return dispatch => {
        Axios.post(URL, { description })
            .then(resp => dispatch(todoClear()))
            .then(resp => dispatch(todoSearch()))
    }
}

export const todoDelete = (todo) => {
    return dispatch => {
        Axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch(todoSearch()))
    }
}


export const markTodoAsDone = (todo) => {
    return dispatch => {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispatch(todoSearch()))
    }
}

export const markTodoAsPending = (todo) => {
    return dispatch => {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispatch(todoSearch()))
    }
}

export const todoClear = () => {
    return [
        { type: TODO_CLEAR }, 
        todoSearch()
    ]
}
