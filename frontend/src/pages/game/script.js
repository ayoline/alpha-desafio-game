let arrCalculate = new Array(...$(".req-item").addClass());
const actualLife = 3;
let resetTimeRun;
let setTimeRun;

$(function () {
    const pageAccessedByReload = (
        (window.performance.navigation && window.performance.navigation.type === 1) ||
        window.performance
            .getEntriesByType('navigation')
            .map((nav) => nav.type)
            .includes('reload')
    );
    const game_id = window.location.search.replace("?id=", "");
    if (pageAccessedByReload) {
        deletePlayer(game_id);
    } else {
        if (game_id) loadGame(game_id);
        else window.location.href = "http://localhost:3001/";
    }
});

$("#math-div").on("click", sendData);

function sendData() {
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
            error: function () {
                alert('id invalid');
                window.location.href = "http://localhost:3001/";
            }
        }).done((data) => {
            const scoreItem = $('#score h2');
            const score = parseInt(scoreItem.text()) + data.score;
            const timeLine = $('.desafio-number')
            if (parseInt(data.life) !== actualLife) life()
            //gera bugs, troque.
            $('#match-current').text(data.subLevel + '/3');
            if (data.correctAnswer)timeLine.eq(parseInt(data.subLevel) - 2).css('backgroundColor', '#68FF74');
            if (parseInt(data.lvl) !== parseInt($('#lvl-number-externo h2').text())) {
                timeLine.css('backgroundColor', '#313640');
                modalPassLvl();
                operarionsUsed(data.lvl);
            }
            $('#lvl-number-externo h2').text(data.lvl);
            if (data.score) scoreItem.text(score);
            resetProblem(data.currentProblemPieces, data.currentProblemResult, data.numEntries);
            if (setTimeRun) timeRun(180);
            else resetTimeRun = true;
            alert(JSON.stringify(data));
        });
    } else {
        //not-fetch
        console.log("invalid");
    }
};

//---------------

function resetProblem(pieces, result, numEntries) {
    $("#number-div-two").html('');
    for (let i of pieces) {
        const spanInfo = $('<span>').text(i);
        const numPieces = $("<button>")
            .addClass("block-num noselect")
            .append(spanInfo);
        $("#number-div-two").append(numPieces);
    }
    $("#result").text(result);

    entries(numEntries);
    start();
}

const life = (() => {
    const hearts = [...$(".heart-icon")];
    let index = hearts.length - 1;
    return function () {
        hearts[index].src = "./assets/img/empty-heart.svg";
        if (index === 0) modalDeath();
        else {
            index--;
            actualLife--;
        }
    };
})();

const entries = (num)=>{
    console.log('entries played');
    $('#calc ul').text('');
    for(let i = 0; i<num*2-1; i++){
        const elementDiv = $('<div>').attr('id',String(i+1))
            .addClass('req-item');
        (i%2 === 0)? elementDiv.addClass('num'): elementDiv.addClass('ope');
        $('#calc ul').append(elementDiv);
    }
    arrCalculate = new Array(...$(".req-item").addClass());
};

const operarionsUsed = (()=>{
    const arr = [['+'],['+'],['-'],['-'],['+','-'],['+','-'],['x'],['/'],['x','/'],['x','/']];
    return function(lvl){
        const itemsDiv = $('.operations-item');
        const itemsSpan = $('.operations-item > span');
        let position;
        for(let i of arr[lvl-1]){
            console.log(i);
            console.log(position);
            itemsSpan.each(function(){
                if(!(position == undefined) || arr[lvl-1].length === 1){
                    console.log(123);
                    $(this).parent().css('backgroundColor','#2f2f2f');
                    $(this).css({
                        "backgroundColor":"#313640",
                        "color":"#272727"
                    });
                }
                if(i === $(this).text())position = $(itemsSpan).index(this);
                else return;
            });
            itemsDiv.eq(position).css('backgroundColor','#F54460');
            itemsSpan.eq(position).css({
                "backgroundColor":"#AD0025",
                "color":"white"
            })
        }
    }
})();

function timeRun(defaultTime) {
    let timer = 0;
    const intervalTimer = setInterval(() => {
        if (defaultTime - timer === -1) {
            clearInterval(intervalTimer);
            setTimeRun = true;
            modalTimeOut();
        }
        else if (resetTimeRun) {
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
            $("#time h2").text(str);
        }
        timer++;
    }, 1000);
}

function cloneOpItem(_cloneItem, _overwriteOp) {
    const opWrite = _overwriteOp;
    const newItem = $('<div>').addClass('noselect operations-item').css('backgroundColor','#F54460');
    $('#operations').css('height','90%');
    const cloneItem = _cloneItem;
    const contentItem = cloneItem.textContent.match(/[+-/x]/)[0];
    let idRef;
    switch (contentItem) {
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
    newItem.children().css({
        "backgroundColor":"#AD0025",
        "color":"white"
    })
    $(idRef).before(newItem);
    $(newItem).draggable({ cancel: false, revert: "invalid", scroll: false, snap: '.req-item' })
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
            const dataElements = data[0];
            for (let i of dataElements) {
                const spanInfo = $('<span>').text(i);
                const numPieces = $("<button>")
                    .addClass("block-num noselect")
                    .append(spanInfo);
                $("#number-div-two").append(numPieces);
            }
            $("#result").text(data[1]);
            console.log(operarionsUsed);
            operarionsUsed(1);
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
        $(i).draggable({ cancel: false, revert: "invalid", scroll: false, snap: '.req-item' });
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
                if (dragItem.parentElement.className.includes('operations-item')) cloneOpItem(dragItem, dropItem);
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

function deletePlayer(playerId) {
    const url = 'http://localhost:3000';
    $.ajax({
        url: `${url}/delete/deleteData`,
        method: "DELETE",
        headers: { Accepts: "application/json" },
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            id: playerId
        }),
        complete: function () {
            if (window.confirm('Sessão encerrada, retornara para pagina inicial.')) {
                window.location.href = "http://localhost:3001/"
            }
            window.location.href = "http://localhost:3001/"
        }
    })
}

function modalDeath() {
    $('.modal-container').addClass('fundo-black');
    // $('.modal').addClass('show-modal')
    $('.btn').removeClass('btn-tempo');
    $('.btn').removeClass('btn-passou');
    $('.btn').addClass('btn-perdeu');

    $('.modal h1').removeClass('color-white');
    $('.modal h1').addClass('color-laranja');

    $('.modal h1').html('VIDAS <span>ESGOTADAS</span>');
    $('.modal h2').html('Você Perdeu');

    $('.modal h2').removeClass('color-azul');
    $('.modal h2').addClass('color-white');

    $('.modal').removeClass('background-azul')
    $('.modal').removeClass('background-verde')
    $('.modal').addClass('background-rosa');

    $('#fechar-modal').click(function () {
        $('.modal-container').removeClass('fundo-black');
        window.location.href = "http://localhost:3001/";
    });
}

function modalTimeOut() {
    $('.modal-container').addClass('fundo-black');
    $('.btn').removeClass('btn-perdeu');
    $('.btn').removeClass('btn-passou');
    $('.btn').addClass('btn-tempo');

    $('.modal h1').removeClass('color-laranja');
    $('.modal h1').addClass('color-white');

    $('.modal h1').html('TEMPO<span>ESGOTADO</span>');
    $('.modal h2').html('Perdeu uma Vida');

    $('.modal h2').removeClass('color-white');
    $('.modal h2').removeClass('color-azul');

    $('.modal').removeClass('background-rosa');
    $('.modal').removeClass('background-verde');
    $('.modal').addClass('background-azul');

    $('#fechar-modal').click(function () {
        $('.modal-container').removeClass('fundo-black');
        arrCalculate.map(k => {
            const index = arrCalculate.indexOf(k);
            return (index % 2 === 0) ? '200' : 'x';
        })
        sendData();
    });
}

function modalPassLvl(){
    $('.modal-container').addClass('fundo-black');
        $('.btn').removeClass('btn-tempo');
        $('.btn').removeClass('btn-perdeu');
        $('.btn').addClass('btn-passou');

        $('.modal h1').removeClass('color-white');
        $('.modal h1').addClass('color-laranja');

        $('.modal h1').html('VOCÊ<span>ARREBENTOU</span>');
        $('.modal h2').html('Passou de Fase');

        $('.modal h2').removeClass('color-white');
        $('.modal h2').addClass('color-azul');

        $('.modal').removeClass('background-azul')
        $('.modal').removeClass('background-rosa');
        $('.modal').addClass('background-verde')

        $('#fechar-modal').click(function () {
            $('.modal-container').removeClass('fundo-black');
        });
}

timeRun(180);