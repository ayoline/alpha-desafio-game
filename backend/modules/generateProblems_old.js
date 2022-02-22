const fs = require('fs');

function generateProblemsByLevel(_lvl) {
    const playerLvl = _lvl;
    const allProblemsJson = JSON.parse(fs.readFileSync('data/all-problems.json'));

    let currentLvlProblems = allProblemsJson[playerLvl - 1];
    let randomProblems = [];

    // Transform the object in array
    for (let el in currentLvlProblems) {
        randomProblems.push(currentLvlProblems[el]);
    }

    randomProblems = shuffleLvlProblems(randomProblems);

    // To separate the problem and de response of the problem in 2 arrays
    randomProblems = randomProblems.map(item => {
        const split = item.replace(/\s/g, '').split('=');
        const arr = split[0].replace(/[+-/x]/g, 'SPACE').split('SPACE');
        return [[...arr], [split[1]]];
    });

    // To generate random numbers until get 10 positions in array
    for (let i = 0; i < randomProblems.length; i++) {
        for (let j = randomProblems[i][0].length; j < 10; j++) {
            do {
                add = true;
                let randomTempNumber = getRandomInt(1, 99);
                if (randomProblems[i][0].includes(randomTempNumber)) {
                    add = false;
                } else {
                    randomProblems[i][0].push(randomTempNumber.toString());
                }
            } while (add == false);
        }
        randomProblems[i][0] = shuffleLvlProblems(randomProblems[i][0]);
    }

    removeLowerPositions(randomProblems);

    return randomProblems;
}

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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.ceil(Math.random() * (max - min + 1));
}

function removeLowerPositions(_array) {
    while (_array.length > 3) {
        _array.pop();
    }
}

module.exports = generateProblemsByLevel;

generateProblemsByLevel(10);