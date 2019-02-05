import axios from 'axios'

const URL = 'http://localhost:3003/api/todos/'

export const changeDescription = (e) => ({
    type: 'DESCRIPTION_CHANGED',
    payload: e.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        console.log(search)
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(result => dispatch({
            type: "TODO_SEARCHED",
            payload: result.data
        }))
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
        .then(result => dispatch(clear()))
        .then(result => dispatch(search()))
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(URL + todo._id)
        .then(result => dispatch(search()))
    }
}

export const markedAsDone = (todo) => {
    return dispatch => {
        axios.put(URL + todo._id, { ...todo, done: true })
        .then(result => dispatch(search()))
    }
}

export const markedAsPending = (todo) => {
    return (
        dispatch => {
            axios.put(URL + todo._id, { ...todo, done: false })
            .then(result => dispatch(search()))
        }
    )
}

export const clear = () => {
    return [{type: "TODO_CLEAR"}, search()]
}
