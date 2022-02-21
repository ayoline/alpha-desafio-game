const express = require("express");
const router = express.Router();
router.use(express.json());
const fs = require("fs");

// modules
const verifyPlayerCalc = require("../modules/verifyPlayerCalc"); // verifyPlayerCalc (problemString, problemResult)
const deleteCurrentPlayer = require("../modules/deletePlayer"); // deleteCurrentPlayer (playerID)
const updateRanking = require("../modules/updateRanking"); // updateRanking(playerObject)
const updateData = require("../modules/updateData"); // updateData(playerObject)
const generateProblemsByLevel = require("../modules/generateProblems"); // generateProblemsByLevel(_problemLevel)

// routes
router.put("/updateData", function (req, res) {
    const playersJson = JSON.parse(
        fs.readFileSync("data/current-players.json", "utf8")
    );
    const reqData = req.body;

    if (reqData.problemString) {
        let playerCurrentObject = playersJson.find((el) => el.id === reqData.id);
        const playerNewObject = reqData;
        if (playerCurrentObject.timerCheck) {
            
        }
        if (verifyPlayerCalc(reqData.problemString, playerCurrentObject.problemResult)) { // player acertou
            if (playerCurrentObject.subLevel === 3) {
                playerNewObject.lvl = playerCurrentObject.lvl + 1;
                playerNewObject.subLevel = 1;
                playerNewObject.levelProblems = generateProblems(playerNewObject.lvl)
            } else {             
                playerNewObject.subLevel = playerCurrentObject.subLevel + 1;
            }
            playerNewObject.currentProblemResult = playerCurrentObject.levelProblems[playerCurrentObject.subLevel-1].split(" ")[-1];
            updateData(playerNewObject);
            playerNewObject.correctAnswer = true;
            res.json(playerNewObject)
        } else {                                                                          // player errou
            playerNewObject.life = playerCurrentObject.life - 1;
            // console.log(`tem ${playerNewObject.life} vida(s)`);
            if (playerNewObject.life < 1) {
                updateRanking(playerNewObject)
                deleteCurrentPlayer(playerNewObject.id)
            } else {
                updateData(playerNewObject);
                playerNewObject.correctAnswer = false
                res.json(playerNewObject)

            }
        }
    }
});

router.get("/updateData", function (req, res) {
    const currentPlayers = JSON.parse(fs.readFileSync("data/current-players.json"));
    const currentPlayer = currentPlayers.filter(el => playerID === el.id)[0];
    const playerID = req.query.id;
    
    // res.json(currentPlayer.)
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
