const express = require('express');
const router = express.Router();
router.use(express.json());
const jsonGames = require('./games.json');
const fs = require('fs');

router.put('/updatedata', function (req, res) {
    const gameFromClient = req.body;
    console.log(gameFromClient);

    if (gameFromClient) {
        const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
        const gameToBeUpdated = games.find((el) => el.id === parseInt(gameFromClient.id));

        if (gameToBeUpdated) {
            const gameToBeUpdatedIndex = games.indexOf(gameToBeUpdated);
            games[gameToBeUpdatedIndex].game = gameFromClient.game;
            games[gameToBeUpdatedIndex].year = gameFromClient.year;
            games[gameToBeUpdatedIndex].genre = gameFromClient.genre;
            games[gameToBeUpdatedIndex].multiplayer = gameFromClient.multiplayer;
            games[gameToBeUpdatedIndex].offline = gameFromClient.offline;
            games[gameToBeUpdatedIndex].crossplataform = gameFromClient.crossplataform;

            fs.writeFile('games.json', JSON.stringify(games), function (err) {
                if (!err) {
                    res.json(gameToBeUpdated.id);
                } else {
                    console.log('Error: ' + err);
                    res.send(err);
                }
            });
        }
    }
});

module.exports = router;