const fs = require('fs');
const express = require('express');
const router = express.Router();
router.use(express.json());

// modules
const deleteCurrentPlayer = require("../modules/deletePlayer");

router.delete('/deleteData', function (req, res) {
    const reqData = req.body;
    const playersJson = JSON.parse(fs.readFileSync("data/current-players.json", "utf8"));
    const currentPlayer = playersJson.find((el) => el.id === reqData.id);

    if (currentPlayer.id && currentPlayer.score && currentPlayer.lvl) {
        deleteCurrentPlayer(currentPlayer.id);

        try {
            res.send('success!');
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;