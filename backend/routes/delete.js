const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');

router.delete('/deleteData', function (req, res) {
    const dataFromClient = req.body;
    const orderedRanking = JSON.parse(fs.readFileSync('data/ranking.json', 'utf8'));

    if (dataFromClient.id && dataFromClient.score && dataFromClient.lvl) {
        const playersJson = JSON.parse(fs.readFileSync('data/current-players.json', 'utf8'));
        const playerToBeDeleted = playersJson.find((el) => el.id === dataFromClient.id);

        orderedRanking.push(dataFromClient);
        orderedRanking.sort((a, b) => Number(a.score) > Number(b.score) ? 1 : -1);
        orderedRanking.reverse();
        removeLowerPositions(orderedRanking);

        fs.writeFile('data/ranking.json', JSON.stringify(orderedRanking), function (err) {
            if (!err) {
                res.json(orderedRanking);
            } else {
                console.log('Error: ' + err);
                res.send(err);
            }
        });

        if (playerToBeDeleted) {
            const playerToBeDeletedIndex = playersJson.indexOf(playerToBeDeleted);
            playersJson.splice(playerToBeDeletedIndex, 1);

            fs.writeFile('data/current-players.json', JSON.stringify(playersJson), function (err) {
                if (!err) {
                    console.log('Player ' + playerToBeDeleted.player + ' has been Deleleted');
                } else {
                    console.log('Error: ' + err);
                }
            });
        }
    }
});

function removeLowerPositions(_array) {
    while (_array.length > 10) {
        _array.pop();
    }
}

module.exports = router;