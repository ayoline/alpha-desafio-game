const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');

const generateProblemsByLevel = require("../modules/generateProblems");

router.post('/saveNewUser', function (req, res) {
    const dataFromClient = req.body;
    const currentPlayersJson = JSON.parse(fs.readFileSync('data/current-players.json', 'utf8'));
    let newUser = {};
    
    if (dataFromClient.name) {
        newUser.id = makeid(5);
        newUser.player = dataFromClient.name;
        newUser.lvl = 1;
        newUser.subLevel = 1;
        newUser.levelProblems = generateProblemsByLevel(newUser.lvl) ;/*["10 + 10 = 20", "10 + 10 = 20", "10 + 15 = 35"]*/ //generateProblems(newUser.lvl); 
        newUser.currentProblemResult = newUser.levelProblems[newUser.subLevel-1][1][0];/*newUser.levelProblems[newUser.subLevel-1].split(" ")[-1];*/ //nao ta funfando, deve ser o index -1
        newUser.timer = Math.ceil(new Date()/1000);
        newUser.timerCheck = true;
        newUser.life = 3;
        newUser.score = 0;

    currentPlayersJson.push(newUser);

        fs.writeFile('data/current-players.json', JSON.stringify(currentPlayersJson), function (err) {
            if (!err) {
                res.json(newUser);
            } else {
                console.log('Erro: ' + err);
            }
        });
    }
});

function makeid(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = router;