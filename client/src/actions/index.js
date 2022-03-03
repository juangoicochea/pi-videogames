import axios from 'axios'

export function getVideogames(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/videogames')
        dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json
        })
    }
}