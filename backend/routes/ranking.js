const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');

router.get('/rankingData', function (req, res) {
    const value = req.query.value;
    const orderedRanking = JSON.parse(fs.readFileSync('data/ranking.json', 'utf8'));

    if (value === 'ranking') {
        orderedRanking.sort((a, b) => Number(a.score) > Number(b.score) ? 1 : -1);
        orderedRanking.reverse();
        filteredResponse(orderedRanking, res);
    }
});

// FAZER ROTA DE UPDATE RANKING

function filteredResponse(filteredJSON, res) {
    if (filteredJSON.length > 0) {
        res.json(filteredJSON);
    } else {
        res.send({ error: true, msg: "NO RESULTS FOUND" });
    }
}

module.exports = router;