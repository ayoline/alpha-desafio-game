const arrCalculate = new Array(...$(".req-item").addClass());

$(function () {
    const game_id = window.location.search.replace("?id=", "");
    if (game_id) {
        loadGame(game_id, arrCalculate);
        // start(arrCalculate);
    } else {
        window.location.href = "http://localhost:3001/";
    }
});

$("#math-div").on("click", function () {
    const check = arrCalculate.every((item) => /^[+-x/]$|^\d+$/.test(item));
    const playerProblemString = arrCalculate.join(" ");
    const currentProblemResult = $("#result").html();
    console.log(playerProblemString, currentProblemResult);
    if (check) {
        const apiUrl = "http://localhost:3000/";
        const game_id = window.location.search.replace("?id=", "");
        $.ajax({
            url: apiUrl + "update/updateData",
            method: "PUT",
            headers: { Accepts: "application/json" },
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                id: game_id,
                problemString: playerProblemString,
                problemResult: currentProblemResult,
            }),
        }).done((data) => {
            // verifyWinOrLose(data);
            // FAZER ROTA DE UPDATE RANKING

            alert(JSON.stringify(data));
        });
    } else {
        //not-fetch
        console.log("invalid");
    }
});

//---------------

const life = (() => {
    const hearts = [...$(".heart-icon")];
    let index = hearts.length - 1;
    return function () {
        hearts[index].src = "./assets/img/empty-heart.svg";
        if (index === 0) console.log("Morreu");
        else index--;
    };
})();

function timeRun(defaultTime) {
    let timer = 0;
    const intervalTimer = setInterval(() => {
        if (defaultTime - timer === -1) clearInterval(intervalTimer);
        else {
            const defaultMinutes = Math.floor((defaultTime - timer) / 60);
            const defaultSeconds =
                `${(defaultTime - timer) % 60}`.length === 2
                    ? `${(defaultTime - timer) % 60}`
                    : `0${(defaultTime - timer) % 60}`;
            const str = defaultMinutes + ":" + defaultSeconds;
            const get_time = $("#time h2").text(str);
        }
        timer++;
    }, 1000);
}

function start(arrCalculate) {
    const arrDrag = [".operations-item", ".block-num"];
    const arrDrop = [
        ["#number", ".block-num"],
        ["#operations", ".operations-item"],
    ];
    const arrResDrop = [
        [".num", ".block-num"],
        [".ope", ".operations-item"],
    ];
    for (let i of arrDrag)
        $(i).draggable({ cancel:false,revert: "invalid", scroll: false, snap:'.req-item' });
    for (let i of arrDrop)
        $(i[0]).droppable({
            accept: i[1],
            classes: {
                "ui-droppable-active": "ui-state-active",
                "ui-droppable-hover": "ui-state-hover",
            },
            // drop: function()
        });
    for (let i of arrResDrop)
        $(i[0]).droppable({
            accept: i[1],
            classes: {
                "ui-droppable-active": "ui-state-active",
                "ui-droppable-hover": "ui-state-hover",
            },
            drop: function (event, ui) {
                console.log(123);
                const dragItem = ui.draggable[0].firstChild;
                const dropItem = event.target;
                console.log(dragItem);
                if (
                    dropItem.className.includes("ope") &&
                    dragItem.className.includes("block-num")
                ) {
                    console.log(false);
                } else if (
                    dropItem.className.includes("num") &&
                    dragItem.className.includes("operations-item")
                ) {
                    console.log(false);
                } else {
                    arrCalculate[parseInt(dropItem.id) - 1] =
                        dragItem.textContent;
                }
            },
        });
}

function loadGame(id, arrCalculate) {
    const apiUrl = "http://localhost:3000/";
    fetch(apiUrl + `problems/problemsData/?value=${id}`)
        .then((res) => {
            if (res.status !== 200) {
                //add-message-error
                window.location.href = "http://localhost:3001/";
                return;
            } else {
                return res.json();
            }
        })
        .then((data) => {
            const dataElements = data[0][0];
            for (let i of dataElements) {
                const spanInfo = $('<span>').text(i);
                const numPieces = $("<button>")
                    .addClass("block-num")
                    .append(spanInfo);
                $("#number-div-two").append(numPieces);
            }
            $("#result").text(data[0][1]);
            start(arrCalculate);

            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id,
                    currentProblemResult: data[0][1],
                }),
            };

            fetch(apiUrl + "update/updateData", requestOptions);
        });
}

function verifyWinOrLose(playerData) {
    if (playerData.lose) {
        alert("VOCÊ PERDEU!");
    } else {
        alert("VOCÊ ERROU!");
    }
}

timeRun(180);
