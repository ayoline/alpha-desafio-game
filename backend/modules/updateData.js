const fs = require('fs');

function updateData(_playerData) {
    const playersJson = JSON.parse(
        fs.readFileSync("data/current-players.json", "utf8")
    );

    let playerToBeUpdated;

    if (_playerData.id) {
        playerToBeUpdated = playersJson.find((el) => el.id === _playerData.id);

        if (playerToBeUpdated) {
            const playerToBeUpdatedIndex =
                playersJson.indexOf(playerToBeUpdated);

            if (_playerData.lvl) {
                playersJson[playerToBeUpdatedIndex].lvl = _playerData.lvl;
            }
            if (_playerData.subLevel) {
                playersJson[playerToBeUpdatedIndex].subLevel =
                    _playerData.subLevel;
            }
            if (_playerData.currentProblemPieces) {
                playersJson[playerToBeUpdatedIndex].currentProblemPieces =
                    _playerData.currentProblemPieces;
            }
            if (_playerData.currentProblemResult) {
                playersJson[playerToBeUpdatedIndex].currentProblemResult =
                    +_playerData.currentProblemResult;
            }
            if (_playerData.numEntries) {
                playersJson[playerToBeUpdatedIndex].numEntries = _playerData.numEntries;
            }
            if (_playerData.life) {
                playersJson[playerToBeUpdatedIndex].life = _playerData.life;
            }
            if (_playerData.score) {
                playersJson[playerToBeUpdatedIndex].score += _playerData.score;
            }
            if (_playerData.timer) {
                playersJson[playerToBeUpdatedIndex].timer = _playerData.timer;
            }

            fs.writeFile(
                "data/current-players.json",
                JSON.stringify(playersJson),
                function (err) {
                    if (err) {
                        console.log("Error: " + err);
                        return error
                    } else {
                        return playerToBeUpdated;
                    }
                }
            );
        }
    }
}

module.exports = updateData;
