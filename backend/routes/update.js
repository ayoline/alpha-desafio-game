const express = require('express');
const router = express.Router();
router.use(express.json());
const currentPlayerJson = require('../data/current-player.json');
const rankingJson = require('../data/ranking.json');

const fs = require('fs');

router.put('/updateData', function (req, res) {
    const dataFromClient = req.body;

    if (dataFromClient) {
        const players = JSON.parse(fs.readFileSync('current-player.json', 'utf8'));
        const playerToBeUpdated = players.find((el) => el.id === dataFromClient.id);

        if (playerToBeUpdated) {
            const gameToBeUpdatedIndex = players.indexOf(playerToBeUpdated);
            players[gameToBeUpdatedIndex].game = dataFromClient.game;
            players[gameToBeUpdatedIndex].year = dataFromClient.year;
            players[gameToBeUpdatedIndex].genre = dataFromClient.genre;
            players[gameToBeUpdatedIndex].multiplayer = dataFromClient.multiplayer;
            players[gameToBeUpdatedIndex].offline = dataFromClient.offline;
            players[gameToBeUpdatedIndex].crossplataform = dataFromClient.crossplataform;

            fs.writeFile('current-player.json', JSON.stringify(players), function (err) {
                if (!err) {
                    res.json(playerToBeUpdated.id);
                } else {
                    console.log('Error: ' + err);
                    res.send(err);
                }
            });
        }
    }
});

module.exports = router;