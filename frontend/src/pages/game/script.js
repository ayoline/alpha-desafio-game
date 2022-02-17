const arrCalculate = new Array(...$('.snip').addClass());

$(function(){
    loadGame();
    start();
});

$('#math-div').on('click', function(){
    const check = (arrCalculate.every(item => /^[+-x/]$|^\d+$/.test(item)));
    if(check){
        //fetch
        console.log('realize fetch');
    }else{
        //not-fetch
        console.log('invalid');
    }
});

//---------------

const life = (()=>{
    const hearts = [...$('.heart-icon')];
    let index = hearts.length-1;
    return function(){
        hearts[index].src = './assets/img/empty-heart.svg';
        if(index === 0)console.log('Morreu');
        else index--;
    }
})();

function timeRun(defaultTime){
    let timer = 0;
    const intervalTimer = setInterval(
        ()=>{
            if(defaultTime-timer === -1)clearInterval(intervalTimer);
            else{
                const defaultMinutes = Math.floor((defaultTime-timer)/60);
                const defaultSeconds = (`${(defaultTime-timer)%60}`.length === 2)? `${(defaultTime-timer)%60}`:`0${(defaultTime-timer)%60}`;
                const str = defaultMinutes + ':' + defaultSeconds;
                const get_time = $('#time > h2').text(str);
            }
            timer++;
        }
        ,1000)
}

function start(){
    const arrDrag = ['.operations','.block-num'];
    const arrDrop = ['#numbers', '#operations-id'];
    const arrResDrop = ['.input-num', '.input-op'];
    for(let i of arrDrag)$(i).draggable({revert:"invalid", scroll:false /*,snap:'.snip'*/});
    for(let i of arrDrop)$(i).droppable({
        classes:{
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        // drop: function()
    });
    for(let i of arrResDrop)$(i).droppable({
        classes:{
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function(event, ui){
            const dragItem = ui.draggable[0];
            const dropItem = event.target;
            if(dropItem.className.includes('input-op') && dragItem.className.includes('block-num')){
                console.log(false);
            }
            else if( dropItem.className.includes('input-num') && dragItem.className.includes('operations')){
                console.log(false);
            }
            else{
                arrCalculate[parseInt(dropItem.id)-1] = dragItem.textContent;
            }
        }
    });
}

function loadGame(){
    const url = `http://localhost:3000/problems/problemsData`;
    fetch(url).then(res=>res.json())
        .then(dataElements=>console.log(dataElements));
    // for(let i of data-elements){
    //     const numPieces = $('div').addClass('block-num', 'block-model').text(data-elements);
    //     $('#numbers>div').append(numPieces);
    // }
}

timeRun(180);
