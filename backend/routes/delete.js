const express = require('express');
const router = express.Router();
router.use(express.json());

// modules
const updateRanking = require("../modules/updateRanking"); // updateRanking(playerName, playerScore, playerLvl)
const deleteCurrentPlayer = require("../modules/deletePlayer"); // deleteCurrentPlayer (playerID)

router.delete('/deleteData', function (req, res) {
    const dataFromClient = req.body;

    if (dataFromClient.id && dataFromClient.score && dataFromClient.lvl) {
        deleteCurrentPlayer(dataFromClient.id);
        updateRanking(dataFromClient.player, dataFromClient.score, dataFromClient.lvl);
    }
});

module.exports = router;
