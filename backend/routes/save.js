const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');

router.post('/saveNewUser', function (req, res) {
    const dataFromClient = req.body;
    const currentPlayersJson = JSON.parse(fs.readFileSync('data/current-players.json', 'utf8'));
    let newUser = {};

    if (dataFromClient.name) {
        newUser.id = makeid(5);
        newUser.player = dataFromClient.name;
        newUser.lvl = 1;
        newUser.subLevel = 1;
        newUser.currentProblem = null;
        newUser.timer = process.env.ROUND_TIME;
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