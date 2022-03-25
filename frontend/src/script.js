const apiURL = "http://localhost:3000/";
const audioClick = $("#click-sound")[0];

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
                <td>lvl ${element.lvl}</td>
                <td>${element.player}</td>
                <td>${element.score} pts</td>
            </tr>
        `);
    });
}

$("#play-button").on("click", function () {
    const newUsername = $("#name-input").val();
    if (/^\w\w\w+$/.test(newUsername) && newUsername.length <= 10) {
        $("#error-message").text('');
        $.post({
            url: apiURL + "save/saveNewUser",
            headers: { Accepts: "application/json" },
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify({
                name: newUsername,
            }),
        }).done((data) => {
            window.location.href = `http://localhost:3001/pages/game/?id=${data.id}`
        });
    } else {
        $("#error-message")
            .text('Nome deve conter entre 3 e 10 caracteres alfanuméricos')
    }
});

$("#play-button").click(function () {
    audioClick.play();
});

$("#add-rank").click(function () {
    audioClick.play();
});

$("#btn-tutorial").click(function () {
    audioClick.play();
});

$("#add-rank").click(function () {
    $("#two").toggleClass('none');
    $("#two").toggleClass('flex');
    $('body').toggleClass('img-1');
});

$('#btn-tutorial').click(function () {
    const modalTutorial = $('#modal-tutorial');
    modalTutorial.css("visibility", "visible");
    modalTutorial.css("opacity", "1");
    //$('body').css("overflow", "auto");
    //$('html,body').css("filter", "blur(4px)");
});

// close tutorial if its open
$(document).click(function (e) {
    if ($(e.target).closest('#modal-tutorial').length != 0 ||
        $(e.target).closest('#btn-tutorial').length > 0) return false;
    const modalTutorial = $('#modal-tutorial');
    modalTutorial.css("visibility", "hidden");
    modalTutorial.css("opacity", "0");
    $('body').css("overflow", "hidden");
    $('html,body').scrollTop(0);
});