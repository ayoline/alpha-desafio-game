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

$("#play-button").on("click", function () {
    const newUsername = $("#name-input").val();
    if (/^\w\w\w+$/.test(newUsername)) {
        $.post({
            url: apiURL + "save/saveNewUser",
            headers: {Accepts: "application/json"},
            contentType : 'application/json',
            dataType: "json",
            data: JSON.stringify({
                name: newUsername,
            }),
        }).done((data) => {
            window.location.href = `http://localhost:3001/pages/game/?id=${data.id}`
        });
    } else {
        console.log("falso");
    }
});