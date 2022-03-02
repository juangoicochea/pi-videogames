const { Router } = require('express');
const { getApiGenres } = require('./functions')
const router = Router();

router.get('/', async (req, res) => {
    let allGames = await getApiGenres()
    res.send(allGames);
})

module.exports = router;