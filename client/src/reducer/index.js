
const initialState = {
    videogames : [],
    videogamesBackup : [],
    genres: [],
    detail: [],
    filtered: []
}

function rootReducer (state=initialState, action){
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                videogamesBackup: action.payload
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'FILTER_BY_GENRE':
            const allVideogames = state.videogamesBackup
            const gamesFiltered = action.payload === 'All' ? allVideogames : allVideogames?.filter(e => e.genres[0].name? e.genres.find(el => el.name === action.payload) : e.genres.includes(action.payload))
            return {
                ...state,
                videogames: gamesFiltered,
                filtered: gamesFiltered
            }
        case 'FILTER_CREATED':
            const allVideogamesLoaded= state.videogamesBackup
            const createdFilter = action.payload === 'Created' ? allVideogamesLoaded.filter(e => e.created_db) : allVideogamesLoaded.filter(e => !e.created_db)
            return {
                ...state,
                videogames: action.payload === 'All' ? allVideogamesLoaded : createdFilter
            }
        case 'ORDER_BY':
            let loadedVideogames = state.filtered
            if(loadedVideogames.length === 0){
                loadedVideogames = state.videogames
            } 
            let orderBy = ''
            if(action.payload === 'All') {
                orderBy = state.videogamesBackup
            }
            if(action.payload === 'Asc_name') {
                orderBy = loadedVideogames.sort((a, b) => {
                    if(a.name > b.name) {
                        return 1
                    }
                    if(b.name > a.name) {
                        return -1
                    }
                    return 0
                })
            }
            if(action.payload === 'Desc_name') {
                orderBy = loadedVideogames.sort((a, b) => {
                    if(a.name > b.name) {
                        return -1
                    }
                    if(b.name > a.name) {
                        return 1
                    }
                    return 0
                })
            }
            if(action.payload === 'Asc_rating') {
                orderBy = loadedVideogames.sort((a, b) => {
                    if(a.rating > b.rating) {
                        return 1
                    }
                    if(b.rating > a.rating) {
                        return -1
                    }
                    return 0
                })
            }
            if(action.payload === 'Desc_rating') {
                orderBy = loadedVideogames.sort((a, b) => {
                    if(a.rating > b.rating) {
                        return -1
                    }
                    if(b.rating > a.rating) {
                        return 1
                    }
                    return 0
                })
            }
            return {
                ...state,
                videogames: orderBy
            }
        case 'SEARCH_BY_NAME':
            return {
                ...state,
                videogames: action.payload
            }
        case 'POST_VIDEOGAME':
            return {
                ...state
            }
        case 'DELETE':
            return {
                ...state
            }
        case 'UPDATE':
            return {
                ...state
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }

            default:
              return state
    }
}

export default rootReducer