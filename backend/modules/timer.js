module.exports = function(initialTime){
    let checkTime;

    const actualTime = Math.floor(new Date()/1000);
    const limitTime = initialTime + parseInt(process.env.ROUND_TIME);
    checkTime = (actualTime < limitTime);

    return {
        check : checkTime,
        finalTime : actualTime
    }
}