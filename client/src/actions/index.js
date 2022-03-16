import axios from 'axios'

export function getVideogames(){
    return async function(dispatch){
        const json = await axios('http://localhost:3001/videogames')
        dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function getGenres() {
    return async function(dispatch){
        const json = await axios('http://localhost:3001/genres')
        dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function filterVideogamesByGenre(payload){
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderBy(payload){
    return {
        type: 'ORDER_BY',
        payload
    }
}

export function orderByRating(payload){
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function searchByName(payload){
    return async function(dispatch){
        try {
            const json = await axios(`http://localhost:3001/videogames?name=${payload}`)
            dispatch({
                type: 'SEARCH_BY_NAME',
                payload: json.data
            })
        } catch(error) {
            dispatch({
                type: 'SEARCH_BY_NAME',
                payload: []
            })
        }
    }
}

export function postVideogame(payload){
    return async function(){
        const json = await axios.post('http://localhost:3001/videogames', payload) 
        return json
    }
}

export function getDetail(payload){
    return async function(dispatch){
        const json = await axios(`http://localhost:3001/videogames/${payload}`)
        dispatch({
            type: 'GET_DETAIL',
            payload: json.data
        })
    }
}