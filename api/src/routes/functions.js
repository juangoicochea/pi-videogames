const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db');

const getApiVideogames = async function () {                      
    //const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    let gamesResults = []
    let apiRAWG = `https://api.rawg.io/api/games?key=${API_KEY}`
    for (let index = 0; index < 5; index++) {
        let games = (await axios.get(apiRAWG)).data


        let dataGame = games.results.map((e) => {
            var game = {
                id: e.id,
                name: e.name,
                image: e.background_image,
                released: e.released,
                rating: e.rating,
                platforms: e.parent_platforms.map(e => e.platform.name),
                genres: e.genres.map(e => e.name)
            }
        
            return game
        })
        apiRAWG = games.next;
        gamesResults = gamesResults.concat(dataGame)
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
    const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const apiAllGenres = await apiUrl.data.results.map(e => e.name)
    const id = apiUrl.data.results.map(e => e.id);

    apiAllGenres.forEach((e, i) => {
        Genre.findOrCreate({
            where: { name: e, id: id[i] }
        })
    })
    const allGenres = await Genre.findAll()
    return allGenres
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
    postVideogames
}