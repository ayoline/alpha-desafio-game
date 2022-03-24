const fs = require("fs");
const express = require("express");
const router = express.Router();
router.use(express.json());

// modules
const verifyPlayerCalc = require("../modules/verifyPlayerCalc");
const deleteCurrentPlayer = require("../modules/deletePlayer");
const updateRanking = require("../modules/updateRanking");
const updateData = require("../modules/updateData");
const generateProblemsByLevel = require("../modules/generateOperations");
const getTimer = require("../modules/timer");
const scoreCal = require("../modules/updateScore");

// routes
router.put("/updateData", function (req, res) {
    const playerToBeUpdated = req.body;
    const playersJson = JSON.parse(fs.readFileSync("data/current-players.json", "utf8"));

    if (playerToBeUpdated.problemString) {
        const currentPlayerObject = playersJson.find((el) => el.id === playerToBeUpdated.id);
        const objTime = getTimer(currentPlayerObject.timer);

        if (verifyPlayerCalc(playerToBeUpdated.problemString, currentPlayerObject.currentProblemResult) && objTime.check) {
            if (currentPlayerObject.subLevel === 3) {
                playerToBeUpdated.lvl = currentPlayerObject.lvl + 1;
                playerToBeUpdated.subLevel = 1;
            } else {
                playerToBeUpdated.lvl = currentPlayerObject.lvl;
                playerToBeUpdated.subLevel = currentPlayerObject.subLevel + 1;
            }

            const newProblem = generateProblemsByLevel(10, playerToBeUpdated.lvl - 1);
            playerToBeUpdated.life = currentPlayerObject.life;
            playerToBeUpdated.score = scoreCal(currentPlayerObject.timer, Math.floor(new Date() / 1000), currentPlayerObject.lvl);
            playerToBeUpdated.timer = Math.ceil(new Date() / 1000);
            playerToBeUpdated.currentProblemResult = playerToBeUpdated.lvl < 11 ? newProblem[1] : 0;
            playerToBeUpdated.currentProblemPieces = playerToBeUpdated.lvl < 11 ? newProblem[0] : 0;
            playerToBeUpdated.numEntries = playerToBeUpdated.lvl < 11 ? newProblem[2] : 0;
            updateData(playerToBeUpdated);
            playerToBeUpdated.correctAnswer = true;

            if (playerToBeUpdated.lvl > 10) {
                const finalScore = playerToBeUpdated.score + currentPlayerObject.score;
                const playerName = currentPlayerObject.player;
                playerToBeUpdated.score = finalScore;
                playerToBeUpdated.endGame = true;
                playerToBeUpdated.player = currentPlayerObject.player;
                playerToBeUpdated.lvl--;
                updateRanking(playerToBeUpdated);

                setTimeout(function () {
                    deleteCurrentPlayer(playerToBeUpdated.id);
                }, 1000);

                try {
                    res.json({
                        endGame: true,
                        finalScore: finalScore,
                        player: playerName
                    });
                } catch (error) {
                    console.log('Endgame error: ' + error);
                }
            } else {
                try {
                    res.json(playerToBeUpdated);
                } catch (error) {
                    console.log('Error: ' + error);
                }
            }
        } else {
            playerToBeUpdated.lvl = currentPlayerObject.lvl;
            playerToBeUpdated.subLevel = currentPlayerObject.subLevel;
            playerToBeUpdated.currentProblemPieces = currentPlayerObject.currentProblemPieces;
            playerToBeUpdated.currentProblemResult = currentPlayerObject.currentProblemResult;
            playerToBeUpdated.numEntries = currentPlayerObject.numEntries;
            playerToBeUpdated.life = currentPlayerObject.life - 1;
            playerToBeUpdated.timer = Math.ceil(new Date() / 1000);

            if (playerToBeUpdated.life < 1) {
                updateRanking(currentPlayerObject);
                playerToBeUpdated.correctAnswer = false;
                deleteCurrentPlayer(playerToBeUpdated.id);
            } else {
                updateData(playerToBeUpdated);
                playerToBeUpdated.correctAnswer = false;
            }

            try {
                res.json(playerToBeUpdated);
            } catch (error) {
                console.log(error);
            }
        }
    }
});

router.get("/updateData", function (req, res) {
    const playerID = req.query.id;
    const currentPlayersJson = JSON.parse(fs.readFileSync("data/current-players.json"));
    const currentPlayer = currentPlayersJson.find((el) => el.id === playerID);
    const problems = currentPlayer.currentProblemPieces;
    const solution = currentPlayer.currentProblemResult;
    const numEntries = currentPlayer.numEntries;
    const arr = [problems, solution, numEntries];

    try {
        res.json(arr);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;