const express = require('express');
const fs = require('fs');
const router = express.Router();
router.use(express.json());

// modules
const updateRanking = require("../modules/updateRanking"); // updateRanking(playerName, playerScore, playerLvl)
const deleteCurrentPlayer = require("../modules/deletePlayer"); // deleteCurrentPlayer (playerID)

router.delete('/deleteData', function (req, res) {
    const reqData = req.body;
    console.log(reqData.id)
    const playersJson = JSON.parse(
        fs.readFileSync("data/current-players.json", "utf8")
    );
    const currentPlayer = playersJson.find((el) => el.id === reqData.id);
    console.log(currentPlayer)
    if (currentPlayer.id && currentPlayer.score && currentPlayer.lvl) {
        const updateReturn = updateRanking(currentPlayer.player, currentPlayer.score, currentPlayer.lvl);
        deleteCurrentPlayer(currentPlayer.id);
        try {
            // res.json(updateReturn);
            res.send('OK');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
});

module.exports = router;
