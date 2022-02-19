const fs = require("fs");

function updateRanking(playerName, playerScore, playerLvl) {
    const orderedRanking = JSON.parse(
        fs.readFileSync("data/ranking.json", "utf8")
    );

    orderedRanking.push({
        "player": playerName,
        "lvl": playerLvl,
        "score": playerScore
    });
    orderedRanking.sort((a, b) => (Number(a.score) > Number(b.score) ? 1 : -1));
    orderedRanking.reverse();
    removeLowerPositions(orderedRanking);

    fs.writeFile(
        "data/ranking.json",
        JSON.stringify(orderedRanking),
        function (err) {
            if (!err) {
                return orderedRanking;
            } else {
                console.log("Error: " + err);
                return err;
            }
        }
    );

    function removeLowerPositions(_array) {
        while (_array.length > 10) {
            _array.pop();
        }
    }
}

module.exports = updateRanking;
