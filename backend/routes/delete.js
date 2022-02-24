const express = require('express');
const fs = require('fs');
const router = express.Router();
router.use(express.json());

// modules
const updateRanking = require("../modules/updateRanking"); // updateRanking(playerName, playerScore, playerLvl)
const deleteCurrentPlayer = require("../modules/deletePlayer"); // deleteCurrentPlayer (playerID)

router.delete('/deleteData', function (req, res) {
    const reqData = req.body;
    const playersJson = JSON.parse(
        fs.readFileSync("data/current-players.json", "utf8")
    );
    const currentPlayer = playersJson.find((el) => el.id === reqData.id);

    if (currentPlayer.id && currentPlayer.score && currentPlayer.lvl) {
        deleteCurrentPlayer(currentPlayer.id);
        try {
            res.send('OK');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
});

module.exports = router;
