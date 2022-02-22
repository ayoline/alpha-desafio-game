const apiURL = "http://localhost:3000/";

$(document).ready(function () {
    $.ajax({
        url: apiURL + `ranking/rankingData?value=ranking`,
    }).done((rankingData) => {
        renderRanking(rankingData);
    });
});

function renderRanking(data) {
    data.forEach((element) => {
        $("#highscores-tbody").append(`
            <tr>
                <td>lvl${element.lvl}</td>
                <td>${element.player}</td>
                <td>${element.score}</td>
            </tr>
        `);
    });
}

$("#play-button").on("click", function () {
    const newUsername = $("#name-input").val();
    if (/^\w\w\w+$/.test(newUsername)) {
        $("#error-message").text('');
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
        $("#error-message")
            .text('Username deve conter no minimo 3 caracteres alphanumericos')
    }
});
