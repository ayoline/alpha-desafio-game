const fs = require("fs");

function deleteCurrentPlayer(_playerID) {
    console.log(_playerID)
    const playersJson = JSON.parse(fs.readFileSync('data/current-players.json', 'utf8'));
    const playerToBeDeleted = playersJson.find((el) => el.id === _playerID);
    console.log(playersJson)
    if (playerToBeDeleted) {
        const playerToBeDeletedIndex = playersJson.indexOf(playerToBeDeleted);
        playersJson.splice(playerToBeDeletedIndex, 1);

        fs.writeFile('data/current-players.json', JSON.stringify(playersJson), function (err) {
            if (!err) {
                console.log('Player ' + playerToBeDeleted.player + ' has been Deleted');
            } else {
                console.log(err);
            }
        });
    }
}

module.exports = deleteCurrentPlayer;
