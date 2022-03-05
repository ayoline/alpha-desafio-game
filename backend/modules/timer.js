const config = require('../config');

function setTimer(_initialTime) {
    const actualTime = Math.floor(new Date() / 1000);
    const limitTime = _initialTime + parseInt(config.timer);
    const checkTime = (actualTime < limitTime);

    return {
        check: checkTime,
        finalTime: actualTime
    }
}

module.exports = setTimer;