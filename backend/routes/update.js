const express = require('express');
const router = express.Router();
router.use(express.json());
const currentPlayersJson = require('../data/current-players.json');
const allProblemsJson = require('../data/all-problems.json');
const fs = require('fs');

router.put('/updateData', function (req, res) {
    const dataFromClient = req.body;
    const playersJson = JSON.parse(fs.readFileSync('current-players.json', 'utf8'));
    let playerToBeUpdated;

    if (dataFromClient.id) {
        playerToBeUpdated = playersJson.find((el) => el.id === dataFromClient.id);
        if (playerToBeUpdated) { const playerToBeUpdatedIndex = playersJson.indexOf(playerToBeUpdated); }

        if (dataFromClient.lvl) {
            playersJson[playerToBeUpdatedIndex].lvl = dataFromClient.lvl;
        }
        if (dataFromClient.currentProblem) {
            playersJson[playerToBeUpdatedIndex].currentProblem = dataFromClient.currentProblem;
        }
        if (dataFromClient.life) {
            playersJson[playerToBeUpdatedIndex].life = dataFromClient.life;
        }
        if (dataFromClient.score) {
            playersJson[playerToBeUpdatedIndex].score = dataFromClient.score;
        }

        fs.writeFile('current-players.json', JSON.stringify(playersJson), function (err) {
            if (!err) {
                res.json(playerToBeUpdated);
            } else {
                console.log('Error: ' + err);
                res.send(err);
            }
        });
    }
});

module.exports = router;