const express = require("express");
const router = express.Router();
router.use(express.json());
const fs = require("fs");

// modules
const verifyPlayerCalc = require("../modules/verifyPlayerCalc"); // verifyPlayerCalc (problemString, problemResult)
const deleteCurrentPlayer = require("../modules/deletePlayer"); // deleteCurrentPlayer (playerID)
const updateRanking = require("../modules/updateRanking"); // updateRanking(playerObject)
const updateData = require("../modules/updateData"); // updateData(playerObject)
const generateProblemsByLevel = require('../modules/generateOperations');
const getTimer = require("../modules/timer");//getTimer(playerCurrentObject.timer);
const scoreCal = require("../modules/updateScore");//scoreCal(initial,ended,lvl)

// routes
router.put("/updateData", function (req, res) {
    const playersJson = JSON.parse(
        fs.readFileSync("data/current-players.json", "utf8")
    );
    const reqData = req.body;

    if (reqData.problemString) {
        let playerCurrentObject = playersJson.find((el) => el.id === reqData.id);
        const playerNewObject = reqData;
        const objTime = getTimer(playerCurrentObject.timer);

        if (verifyPlayerCalc(reqData.problemString, playerCurrentObject.currentProblemResult) && objTime.check) { // player acertou
            if(playerCurrentObject.lvl === 10 && playerCurrentObject.subLevel === 3){
                res.json({endGame: true});
            }
            if (playerCurrentObject.subLevel === 3) {
                playerNewObject.lvl = playerCurrentObject.lvl + 1;
                playerNewObject.subLevel = 1;
            } else {
                playerNewObject.lvl = playerCurrentObject.lvl;
                playerNewObject.subLevel = playerCurrentObject.subLevel + 1;
            }
            const newProblem = generateProblemsByLevel(10, playerNewObject.lvl - 1);
            playerNewObject.life = playerCurrentObject.life;
            playerNewObject.score = scoreCal(playerCurrentObject.timer, Math.floor(new Date() / 1000), playerCurrentObject.lvl);
            playerNewObject.timer = Math.ceil(new Date() / 1000);
            playerNewObject.currentProblemResult = newProblem[1];
            playerNewObject.currentProblemPieces = newProblem[0];
            playerNewObject.numEntries = newProblem[2];
            updateData(playerNewObject);
            playerNewObject.correctAnswer = true;
            try {
                res.json(playerNewObject);
            } catch (error) {
                console.log('Error: ' + error);
            }
        } else {                                                                  // player errou
            playerNewObject.lvl = playerCurrentObject.lvl;
            playerNewObject.subLevel = playerCurrentObject.subLevel;
            playerNewObject.currentProblemPieces = playerCurrentObject.currentProblemPieces;
            playerNewObject.currentProblemResult = playerCurrentObject.currentProblemResult;
            playerNewObject.numEntries = playerCurrentObject.numEntries;
            playerNewObject.life = playerCurrentObject.life - 1;
            playerNewObject.timer = Math.ceil(new Date() / 1000);
            if (playerNewObject.life < 1) {
                updateRanking(playerCurrentObject);
                playerNewObject.correctAnswer = false;
                deleteCurrentPlayer(playerNewObject.id);
            } else {
                updateData(playerNewObject);
                playerNewObject.correctAnswer = false;
            }
            res.json(playerNewObject);
        }
    }
});

router.get("/updateData", function (req, res) {
    const currentPlayers = JSON.parse(fs.readFileSync("data/current-players.json"));
    const playerID = req.query.id;
    const currentPlayer = currentPlayers.find(el => playerID === el.id);
    const problems = currentPlayer.currentProblemPieces;
    const solution = currentPlayer.currentProblemResult;
    const numEntries = currentPlayer.numEntries;
    const arr = [problems, solution, numEntries];

    res.json(arr);
})

module.exports = router;

// function newTimer(_id) {
//     const actualDate = new Date();
//     let playerNewObject = {id: _id, timer: actualDate}
//     updateData(playerNewObject);
// }
// function verifyTimer(_id) {
//     const currentPlayers = JSON.parse(fs.readFileSync("data/current-players.json"));
//     const currentPlayer = currentPlayers.filter(el => playerID === _id)[0];
//     const actualDate = new Date();
//     if () {
//         return true
//     } else {
//         return false
//     }
// }