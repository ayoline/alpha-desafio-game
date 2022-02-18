const express = require("express");
const router = express.Router();
router.use(express.json());
const fs = require("fs");

const verifyPlayerCalc = require("../modules/verifyPlayerCalc");

router.put("/updateData", function (req, res) {
    const playersJson = JSON.parse(
        fs.readFileSync("data/current-players.json", "utf8")
    );
    const dataFromClient = req.body;
    console.log(dataFromClient);
    if (dataFromClient.problemResult) {
        playerToBeUpdated = playersJson.find(
            (el) => el.id === dataFromClient.id
        );
        if (
            verifyPlayerCalc(
                dataFromClient.problemString,
                dataFromClient.problemResult
            )
        ) {
            playerToBeUpdated = playersJson.find(
                (el) => el.id === dataFromClient.id
            );

            if (playerToBeUpdated.subLevel === 3) {
                dataFromClient.lvl = playerToBeUpdated.lvl + 1;
                dataFromClient.subLevel = 1;
            } else {
                dataFromClient.subLevel = playerToBeUpdated.subLevel + 1;
            }
        } else {
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
                const playerToBeUpdatedIndex =
                    playersJson.indexOf(playerToBeUpdated);

                if (_playerData.lvl) {
                    playersJson[playerToBeUpdatedIndex].lvl = _playerData.lvl;
                }
                if (_playerData.subLevel) {
                    playersJson[playerToBeUpdatedIndex].subLevel =
                        _playerData.subLevel;
                }
                if (_playerData.currentProblemResult) {
                    playersJson[playerToBeUpdatedIndex].currentProblemResult =
                        +_playerData.currentProblemResult[0];
                }
                if (_playerData.life) {
                    playersJson[playerToBeUpdatedIndex].life = _playerData.life;
                }
                if (_playerData.score) {
                    playersJson[playerToBeUpdatedIndex].score =
                        _playerData.score;
                }

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
