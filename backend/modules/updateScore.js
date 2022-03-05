const config = require('../config');

function updateScore(_startDate, _endDate, _lvl) {
    const playerLevel = _lvl;
    const maxTime = config.timer;
    const multiplier = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
    const timeExpendInSeconds = (_endDate - _startDate);
    const timeLeft = parseInt(maxTime) - parseInt(timeExpendInSeconds);
    const scoreCalculated = timeLeft * multiplier[playerLevel - 1];

    return scoreCalculated;
}

module.exports = updateScore;