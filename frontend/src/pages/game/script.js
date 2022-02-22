const arrCalculate = new Array(...$(".req-item").addClass());
const actualLife = 3;
let problemsLevel;
let resetTimeRun;
let setTimeRun;

$(function () {
    const game_id = window.location.search.replace("?id=", "");
    if (game_id)loadGame(game_id);
    else window.location.href = "http://localhost:3001/";
});

$("#math-div").on("click", function () {
    const check = arrCalculate.every((item) => /^[+-x/]$|^\d+$/.test(item));
    const playerProblemString = arrCalculate.join(" ");
    
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
                problemString: playerProblemString
            }),
            error: function(){
                alert('id invalid');
                window.location.href = "http://localhost:3001/";
            }
        }).done((data) => {
            const scoreItem = $('#score h2');
            const score = parseInt(scoreItem.text()) + data.score;
            const timeLine = $('.desafio-number')
            if(parseInt(data.life)!==actualLife)life()
            //gera bugs, troque.
            $('#match-current').text(data.subLevel + '/3');
            if(data.correctAnswer)timeLine.eq(parseInt(data.subLevel)-2).css('backgroundColor','#68FF74');
            if(parseInt(data.lvl) !== parseInt($('#lvl-number-externo h2').text())){
                timeLine.css('backgroundColor', '#313640');
            }
            $('#lvl-number-externo h2').text(data.lvl);
            scoreItem.text(score);
            resetProblem(data.subLevel-1);
            if(setTimeRun) timeRun(180);
            else resetTimeRun = true;
            alert(JSON.stringify(data));
        });
    } else {
        //not-fetch
        console.log("invalid");
    }
});

//---------------

function resetProblem(problemIndex){
    $("#number-div-two").html('');
    for (let i of problemsLevel[problemIndex][0]) {
        const spanInfo = $('<span>').text(i);
        const numPieces = $("<button>")
            .addClass("block-num noselect")
            .append(spanInfo);
        $("#number-div-two").append(numPieces);
    }
    $("#result").text(problemsLevel[problemIndex][1]);
    start();
}

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
        if (defaultTime - timer === -1) {
            clearInterval(intervalTimer);
            setTimeRun = true;
        }
        else if(resetTimeRun){
            resetTimeRun = false;
            timeRun(180);
            clearInterval(intervalTimer);
        }
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

function cloneOpItem(_cloneItem, _overwriteOp){
    const opWrite = _overwriteOp;
    const newItem = $('<div>').addClass('noselect operations-item');
    const cloneItem = _cloneItem;
    const contentItem = cloneItem.textContent.match(/[+-/x]/)[0];
    let idRef;
    switch (contentItem){
        case '+':
            idRef = '#reference-plus-clone';
            newItem.append('<span>+</span>');
            break;
        case '-':
            idRef = '#reference-minus-clone';
            newItem.append('<span>-</span>');
            break;
        case 'x':
            idRef = '#reference-product-clone';
            newItem.append('<span>x</span>');
            break;
        case '/':
            idRef = '#reference-division-clone';
            newItem.append('<span>/</span>');
            break;
    }
    $(idRef).before(newItem);
    $(newItem).draggable({ cancel:false,revert: "invalid", scroll: false, snap:'.req-item' })
    opWrite.textContent = contentItem;
    opWrite.style.backgroundColor = '#ad0025';
    cloneItem.parentElement.parentNode.removeChild(cloneItem.parentElement);
    return;
}

function loadGame(id) {
    const apiUrl = "http://localhost:3000/";
    fetch(apiUrl + `update/updateData/?id=${id}`)
        .then((res) => {
            if (res.status !== 200) {
                window.alert('id invalido');
                window.location.href = "http://localhost:3001/";
                return;
            } else {
                return res.json();
            }
        })
        .then((data) => {
            const dataElements = data[0][0];
            problemsLevel = data;
            for (let i of dataElements) {
                const spanInfo = $('<span>').text(i);
                const numPieces = $("<button>")
                    .addClass("block-num noselect")
                    .append(spanInfo);
                $("#number-div-two").append(numPieces);
            }
            $("#result").text(data[0][1]);
            start();
        });
}

function start() {
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
                const dragItem = ui.draggable[0].firstChild;
                const dropItem = event.target;
                if(dragItem.parentElement.className.includes('operations-item'))cloneOpItem(dragItem, dropItem);
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

timeRun(180);