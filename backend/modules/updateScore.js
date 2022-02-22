
// the parameters format needed: startDate = new Date(); endDate = new Date(); lvl = intNumber;
function updateScore(_startDate, _endDate, _lvl) {
    const maxTime = process.env.ROUND_TIME;
    const timeExpendInSeconds = (_endDate.getTime() - _startDate.getTime()) / 1000;
    const timeLeft = parseInt(maxTime) - parseInt(timeExpendInSeconds);
    let scoreCalculated;
    if (_lvl === 1) { scoreCalculated = timeLeft * 1 };
    if (_lvl === 2) { scoreCalculated = timeLeft * 2 };
    if (_lvl === 3) { scoreCalculated = timeLeft * 4 };
    if (_lvl === 4) { scoreCalculated = timeLeft * 8 };
    if (_lvl === 5) { scoreCalculated = timeLeft * 16 };
    if (_lvl === 6) { scoreCalculated = timeLeft * 32 };
    if (_lvl === 7) { scoreCalculated = timeLeft * 64 };
    if (_lvl === 8) { scoreCalculated = timeLeft * 128 };
    if (_lvl === 9) { scoreCalculated = timeLeft * 256 };
    if (_lvl === 10) { scoreCalculated = timeLeft * 512 };

    return scoreCalculated;
}
