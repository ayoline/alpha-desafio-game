const fs = require('fs');

function updateData(_playerData) {
    const currentPlayer = _playerData;
    const playersJson = JSON.parse(
        fs.readFileSync("data/current-players.json", "utf8")
    );

    if (currentPlayer.id) {
        const playerToBeUpdated = playersJson.find((el) => el.id === currentPlayer.id);

        if (playerToBeUpdated) {
            const playerToBeUpdatedIndex = playersJson.indexOf(playerToBeUpdated);

            if (currentPlayer.lvl) {
                playersJson[playerToBeUpdatedIndex].lvl = currentPlayer.lvl;
            }
            if (currentPlayer.subLevel) {
                playersJson[playerToBeUpdatedIndex].subLevel = currentPlayer.subLevel;
            }
            if (currentPlayer.currentProblemPieces) {
                playersJson[playerToBeUpdatedIndex].currentProblemPieces =
                    currentPlayer.currentProblemPieces;
            }
            if (currentPlayer.currentProblemResult) {
                playersJson[playerToBeUpdatedIndex].currentProblemResult =
                    parseInt(currentPlayer.currentProblemResult);
            }
            if (currentPlayer.numEntries) {
                playersJson[playerToBeUpdatedIndex].numEntries = currentPlayer.numEntries;
            }
            if (currentPlayer.life) {
                playersJson[playerToBeUpdatedIndex].life = currentPlayer.life;
            }
            if (currentPlayer.score) {
                playersJson[playerToBeUpdatedIndex].score += currentPlayer.score;
            }
            if (currentPlayer.timer) {
                playersJson[playerToBeUpdatedIndex].timer = currentPlayer.timer;
            }

            fs.writeFile("data/current-players.json", JSON.stringify(playersJson), function (err) {
                if (!err) {
                    return playerToBeUpdated;
                } else {
                    console.log("Error: " + err);
                    return err;
                }
            });
        }
    }
}

module.exports = updateData;