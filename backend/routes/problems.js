const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');

router.get('/problemsData/:player_id', function (req, res) {
    const dataFromClient = req.params.player_id;
    const currentPlayers = JSON.parse(fs.readFileSync('data/current-players.json'));
    const allProblemsJson = JSON.parse(fs.readFileSync('data/all-problems.json'));

    const verifyPlayer = currentPlayers.filter(k=> dataFromClient === k.id)[0];
    //se houver mais?

    if (verifyPlayer.lvl) {
        let currentLvlProblems = allProblemsJson[verifyPlayer.lvl - 1];
        let randomProblems = [];
        let randomProblemsJSON = [{}];

        // Transform the object in array
        for (let el in currentLvlProblems) {
            randomProblems.push(currentLvlProblems[el]);
        }

        randomProblems = shuffleLvlProblems(randomProblems);

        randomProblemsJSON[0].id = verifyPlayer.id;
        randomProblemsJSON[0].q01 = randomProblems[0];
        randomProblemsJSON[0].q02 = randomProblems[1];
        randomProblemsJSON[0].q03 = randomProblems[2];

        randomProblems = randomProblems.map(item => {
            const split = item.replace(/\s/g,'').split('=');
            const arr = split[0].replace(/[+-/x]/g,'SPACE').split('SPACE');
            return [[...arr,'01','02','03','04','05','06'],[split[1]]];
        });
        console.log(randomProblems);
        console.log(randomProblemsJSON);

        res.json(randomProblems);
    }

});

function shuffleLvlProblems(_array) {
    let currentIndex = _array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [_array[currentIndex], _array[randomIndex]] = [
            _array[randomIndex], _array[currentIndex]];
    }
    return _array;
}

module.exports = router;