const { Router } = require('express');
const { Videogame } = require('../db')
const { getAllVideogames, postVideogames } = require('./functions')
const router = Router();

router.get('/', async (req, res) => {
    const name = req.query.name
    let allGames = await getAllVideogames()
    if(name){
        let gameName = await allGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        gameName.length ?
        res.status(200).send(gameName) :
        res.status(404).send('The videogame does not exist')
    } else {
        res.status(200).send(allGames)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const allGames = await getAllVideogames()
    if(id){
        let gameId = await allGames.filter(e => e.id == id)
        gameId.length ?
        res.status(200).json(gameId) :
        res.status(404).send("Can't find that videogame")
    }
})

router.post('/', async (req, res) => {
        postVideogames(req.body)
        res.status(200).send('Videogame created succesfully!')
})

module.exports = router;