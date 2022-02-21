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

    randomProblems = randomProblems.map(item => {
        const split = item.replace(/\s/g, '').split('=');
        const arr = split[0].replace(/[+-/x]/g, 'SPACE').split('SPACE');
        return [[...arr, '01', '02', '03', '04', '05', '06'], [split[1]]];
    });

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

module.exports = generateProblemsByLevel;