import Axios from "axios";

const URL = 'http://localhost:3003/api/todos'

export const setDescription = event => ({
    type: 'SET_DESCRIPTION',
    payload: event.target.value
});

export const todoSearch = () => {
    const request = Axios.get(`${URL}?sort=-createdAt`)
    return {
        type: 'TODO_SEARCH',
        payload: request
    }
}

export const todoAdd = (description) => {
    return dispatch => {
        Axios.post(URL, { description })
            .then(resp => dispatch({ type: 'TODO_ADD', payload: resp.data }))
            .then(resp => dispatch(todoSearch()))
    }
    // const request = Axios.post(URL, { description })
    // return [
    //     { type: 'TODO_ADD', payload: request },
    //     todoSearch()
    // ]
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
