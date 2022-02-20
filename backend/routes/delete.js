const express = require('express');
const router = express.Router();
router.use(express.json());

// modules
const updateRanking = require("../modules/updateRanking"); // updateRanking(playerName, playerScore, playerLvl)
const deleteCurrentPlayer = require("../modules/deletePlayer"); // deleteCurrentPlayer (playerID)

router.delete('/deleteData', function (req, res) {
    const reqData = req.body;

    if (reqData.id && reqData.score && reqData.lvl) {
        const updateReturn = updateRanking(reqData.player, reqData.score, reqData.lvl);
        deleteCurrentPlayer(reqData.id);
        try {
            res.json(updateReturn);
        } catch (error) {
            res.send(error);
        }
    }
});

module.exports = router;
