const apiURL = "http://localhost:3000/";

$(document).ready(function () {
    $.ajax({
        url: apiURL + `ranking/rankingData?value=ranking`,
    }).done((data) => {
        console.log(data);
        renderRanking(data)
    });
});

function renderRanking(data) {
    data.forEach((element) => {
        $("#highscores-tbody").append(`
            <tr>
                <td>lvl${element.lvl}</td>
                <td>${element.nome}</td>
                <td>${element.score}</td>
            </tr>
        `);
    });
}
