const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');

router.get('/problemsData', function (req, res) {
    const dataFromClient = req.body;
    const allProblemsJson = JSON.parse(fs.readFileSync('data/all-problems.json', 'utf8'));

    if (dataFromClient.lvl) {
        let currentLvlProblems = allProblemsJson[dataFromClient.lvl - 1];
        let randomProblems = [];
        let randomProblemsJSON = [];

        // Transform the object in array
        for (let el in currentLvlProblems) {
            randomProblems.push(currentLvlProblems[el]);
        }

        shuffleLvlProblems(randomProblems);

        randomProblemsJSON[0].id = dataFromClient.id;
        randomProblemsJSON[0].q01 = randomProblems[0];
        randomProblemsJSON[0].q02 = randomProblems[1];
        randomProblemsJSON[0].q03 = randomProblems[2];

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