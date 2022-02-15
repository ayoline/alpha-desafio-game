const express = require('express');
const router = express.Router();
router.use(express.json());
const jsonGames = require('./games.json');
const fs = require('fs');

router.delete('/deletedata', function (req, res) {
    const idFromGame = Number(req.body.id);

    if (idFromGame) {
        const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
        const gameToBeDeleted = games.find((el) => el.id === idFromGame);

        if (gameToBeDeleted) {
            const gameToBeDeletedIndex = games.indexOf(gameToBeDeleted);
            games.splice(gameToBeDeletedIndex, 1);

            fs.writeFile('games.json', JSON.stringify(games), function (err) {
                if (!err) {
                    res.json(gameToBeDeleted);
                } else {
                    console.log('Error: ' + err);
                    res.send(err);
                }
            });
        }
    }
});

module.exports = router;