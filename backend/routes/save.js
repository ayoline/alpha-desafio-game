const fs = require('fs');
const express = require('express');
const router = express.Router();
router.use(express.json());

// modules
const generateProblemsByLevel = require("../modules/generateOperations.js");

router.post('/saveNewUser', function (req, res) {
    const dataFromClient = req.body;
    const currentPlayersJson = JSON.parse(fs.readFileSync('data/current-players.json', 'utf8'));
    const newUser = {};

    if (dataFromClient.name) {
        newUser.id = makeid(5);
        newUser.player = dataFromClient.name;
        newUser.lvl = 1;
        newUser.subLevel = 1;
        const arrProblems = generateProblemsByLevel(10, newUser.lvl - 1);
        newUser.currentProblemPieces = arrProblems[0];
        newUser.currentProblemResult = arrProblems[1];
        newUser.numEntries = arrProblems[2];
        newUser.timer = Math.ceil(new Date() / 1000);
        newUser.timerCheck = true;
        newUser.life = 3;
        newUser.score = 1;

        currentPlayersJson.push(newUser);

        fs.writeFile('data/current-players.json', JSON.stringify(currentPlayersJson), function (err) {
            try {
                if (!err) {
                    res.json(newUser);
                } else {
                    res.send({ error: true, msg: "ERROR SAVING FILE!" });
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
});

function makeid(_length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < _length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports = router;