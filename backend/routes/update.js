const express = require("express");
const router = express.Router();
router.use(express.json());
const fs = require("fs");

// modules
const verifyPlayerCalc = require("../modules/verifyPlayerCalc"); // verifyPlayerCalc (problemString, problemResult)
const deleteCurrentPlayer = require("../modules/deletePlayer"); // deleteCurrentPlayer (playerID)
const updateRanking = require("../modules/updateRanking");

// routes
router.put("/updateData", function (req, res) {
    const playersJson = JSON.parse(
        fs.readFileSync("data/current-players.json", "utf8")
    );
    const dataFromClient = req.body;

    console.log(dataFromClient);

    if (dataFromClient.problemResult) {
        let playerToBeUpdated = playersJson.find(el => el.id === dataFromClient.id);
        
        if (verifyPlayerCalc(dataFromClient.problemString, dataFromClient.problemResult)) {
            if (playerToBeUpdated.subLevel === 3) {
                dataFromClient.lvl = playerToBeUpdated.lvl + 1;
                dataFromClient.subLevel = 1;
            } else {
                dataFromClient.subLevel = playerToBeUpdated.subLevel + 1;
            }
        } else {
            console.log("perdeu 1 vida")
            dataFromClient.life = playerToBeUpdated.life - 1;
        }
    }

    updateData(dataFromClient);

    function updateData(_playerData) {
        let playerToBeUpdated;

        if (_playerData.id) {
            playerToBeUpdated = playersJson.find(
                (el) => el.id === _playerData.id
            );

            if (playerToBeUpdated) {
                const playerJSONObject = playersJson[playersJson.indexOf(playerToBeUpdated)];

                if (_playerData.lvl) {
                    playerJSONObject.lvl = _playerData.lvl;
                }
                if (_playerData.subLevel) {
                    playerJSONObject.subLevel =
                        _playerData.subLevel;
                }
                if (_playerData.currentProblemResult) {
                    playerJSONObject.currentProblemResult =
                        +_playerData.currentProblemResult[0];
                }
                if (_playerData.life >= 0) {
                    playerJSONObject.life = _playerData.life;
                    if (playerJSONObject.life < 1) {
                        console.log("MORREU")

                        const tempPlayer = playerJSONObject;
                        // updateRanking(playerJSONObject.player, playerJSONObject.score, playerJSONObject.lvl);
                        deleteCurrentPlayer(dataFromClient.id);
                        res.json({
                            lose: true, 
                            player: tempPlayer.player,
                            score: tempPlayer.score,
                            lvl: tempPlayer.lvl
                        });
                        return
                    }
                }
                if (_playerData.score) {
                    playerJSONObject.score =
                        _playerData.score;
                }
                console.log("PASSOU")

                fs.writeFile(
                    "data/current-players.json",
                    JSON.stringify(playersJson),
                    function (err) {
                        if (!err) {
                            res.json(playerToBeUpdated);
                        } else {
                            console.log("Error: " + err);
                            res.send(err);
                        }
                    }
                );
            }
        }
    }
});

module.exports = router;
