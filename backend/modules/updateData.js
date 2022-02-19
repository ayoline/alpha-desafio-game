function updateData(_playerData) {
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
            if (_playerData.currentProblemResult) {
                playersJson[playerToBeUpdatedIndex].currentProblemResult =
                    +_playerData.currentProblemResult[0];
            }
            if (_playerData.life) {
                playersJson[playerToBeUpdatedIndex].life = _playerData.life;
                if (playersJson[playerToBeUpdatedIndex].life < 1) {
                    deleteCurrentPlayer(dataFromClient.id);
                }
            }
            if (_playerData.score) {
                playersJson[playerToBeUpdatedIndex].score = _playerData.score;
            }

            fs.writeFile(
                "data/current-players.json",
                JSON.stringify(playersJson),
                function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log("Error: " + err);
                        res.json(playerToBeUpdated);
                    }
                }
            );
        }
    }
}

module.exports = updateData;
