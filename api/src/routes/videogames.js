const { Router } = require('express');
const { Videogame } = require('../db')
const { getAllVideogames, getVideogameDetail, postVideogames, updateVideogames } = require('./functions')
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
    const game = await getVideogameDetail(id)
    if(id){
        res.status(200).json(game) 
    } else {
        res.status(404).send("Can't find that videogame")
    }
        
})

router.post('/', async (req, res) => {
        postVideogames(req.body)
        res.status(200).send('Videogame created succesfully!')
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const game = await Videogame.findByPk(id)
    if(game){
        await updateVideogames(game, req.body)
        res.status(200).send('Videogame updated!')
    } else {
        res.status(404).send("Can't find that videogame")
    }
        
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const game = await Videogame.findByPk(id)
    if(game){
        await game.destroy();
        res.status(200).json('Videogame deleted!') 
    } else {
        res.status(404).send("Can't find that videogame")
    }
        
})



module.exports = router;