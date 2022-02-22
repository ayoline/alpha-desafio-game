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
            console.log(_playerData.timer);
            console.log(playersJson[playerToBeUpdatedIndex].timer);

            if (_playerData.lvl) {
                playersJson[playerToBeUpdatedIndex].lvl = _playerData.lvl;
            }
            if (_playerData.subLevel) {
                playersJson[playerToBeUpdatedIndex].subLevel =
                    _playerData.subLevel;
            }
            if (_playerData.currentProblemResult) {
                playersJson[playerToBeUpdatedIndex].currentProblemResult =
                    +_playerData.currentProblemResult[0];
            }
            if (_playerData.life) {
                playersJson[playerToBeUpdatedIndex].life = _playerData.life;
            }
            if (_playerData.score) {
                playersJson[playerToBeUpdatedIndex].score = _playerData.score;
            }
            if (_playerData.timer){
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
