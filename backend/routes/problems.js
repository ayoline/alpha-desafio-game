const express = require('express');
const router = express.Router();
router.use(express.json());
const currentPlayersJson = require('../data/current-players.json');
const allProblemsJson = require('../data/all-problems.json');

router.get('/problemsData', function (req, res) {
    const dataFromClient = req.body;

    if (dataFromClient.currentProblem) {
        let currentLvlProblems = allProblemsJson[dataFromClient.currentProblem - 1];
        let randomProblems = [];

        // Transform the object in array
        for (let el in currentLvlProblems) {
            randomProblems.push(currentLvlProblems[el]);
        }

        shuffleLvlProblems(randomProblems);
        removeLowerPositions(randomProblems);
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

function removeLowerPositions(_array) {
    while (_array.length > 3) {
        _array.pop();
    }
}

module.exports = router;