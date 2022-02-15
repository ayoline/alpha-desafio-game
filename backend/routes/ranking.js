const express = require('express');
const router = express.Router();
const jsonRanking = require('../data/ranking.json');

router.get('/rankingData', function (req, res) {
    const value = req.query.value;
    const orderedRanking = jsonRanking;

    if (value === 'ranking') {
        orderedRanking.sort(
            (a, b) => Number(a.pts) > Number(b.pts) ? 1 : -1
        );
        filteredResponse(orderedRanking, res);
    }
});

function filteredResponse(filteredJSON, res) {
    if (filteredJSON.length > 0) {
        res.json(filteredJSON);
    } else {
        res.send({ error: true, msg: "NENHUM RESULTADO ENCONTRADO" });
    }
}

module.exports = router;