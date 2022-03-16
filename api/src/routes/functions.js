const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db');

const getApiVideogames = async function () {                      
    let gamesResults = []
    let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    for (let i = 0; i < 7; i++) {
        const gammesReady = response.data.results.map(e => {
            return {
                id: e.id,
                name: e.name,
                image: e.background_image,
                released: e.released,
                rating: e.rating,
                platforms: e.parent_platforms.map(el => el.platform.name),
                genres: e.genres.map(el => el.name)
            }
        })
        response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
        gamesResults = gamesResults.concat(gammesReady)
    }
    return gamesResults
}

const getDbVideogames = async function () {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllVideogames = async function () {
    const apiInfo = await getApiVideogames()
    const dbInfo = await getDbVideogames()
    const allInfo = apiInfo.concat(dbInfo)
    return allInfo
}

const getApiGenres = async function () {
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const apiAllGenres = response.data.results.map(e => e.name)
    const id = response.data.results.map(e => e.id);

    apiAllGenres.forEach((e, i) => {
        Genre.findOrCreate({
            where: { name: e, id: id[i] }
        })
    })
    const allGenres = await Genre.findAll()
    return allGenres
}

const getVideogameDetail = async function (id) { 
    if(id.length > 7 && typeof id === 'string' ){
        const videogamesDb = await Videogame.findAll({
            include:{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        let gameDB = await videogamesDb.filter(el => el.dataValues.id === id)
        return gameDB[0].dataValues
    }                     
    let response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const game = {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            image: response.data.background_image,
            released: response.data.released,
            rating: response.data.rating,
            platforms: response.data.parent_platforms.map(el => el.platform.name),
            genres: response.data.genres.map(el => el.name)
    }
    return game
}

const postVideogames = async function (data) {
    let {
        name,
        description,
        image,
        release_date,
        rating,
        platforms,
        genres,
        created_db

    } = data

    let gameCreated = await Videogame.create({
        name,
        description,
        image,
        release_date,
        rating,
        platforms,
        created_db,
    })

    let gameGenresDb = await Genre.findAll({
            where: { name: genres }
    })
    gameCreated.addGenre(gameGenresDb)
}

module.exports = {
    getAllVideogames,
    getApiGenres,
    postVideogames,
    getVideogameDetail
}