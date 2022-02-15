const express = require('express');
const router = express.Router();
const jsonGames = require('./games.json');

router.get('/order', function (req, res) {
    const value = req.query.value;
    const orderedGames = jsonGames;

    if (value === 'order') {
        orderedGames.sort(
            (a, b) => Number(a.id) > Number(b.id) ? 1 : -1
        );
        filteredResponse(orderedGames, res);
    } else {
        const filtered = jsonGames.filter((element) => {
            return element.id === Number(value);
        });
        filteredResponse(filtered, res);
    }
});

function filteredResponse(filteredJSON, res) {
    if (filteredJSON.length > 0) {
        res.json(filteredJSON);
    } else {
        res.send({ error: true, msg: "NENHUM RESULTADO ENCONTRADO" });
    }
}

module.exports = router
