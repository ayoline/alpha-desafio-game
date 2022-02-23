var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();

let section = document.querySelector('section');
window.addEventListener('scroll', function() {
    let text = document.querySelector('.text');
    let innerText = document.querySelector('.innerText');
    let value = window.scrollY;
    section.style.clipPath = 'circle(' + value + 'px at center center)';
    text.style.left = 100 - value / 5 + '%';
    innerText.style.left = 100 - value / 5 + '%';
});

$('#btn').on('click',function(){
    window.location.href = 'http://localhost:3001/';
})

$(function(){
    let scoreNumber = window.location.search.replace('?id','');
    let posicaoPlacar = $('button').offset().top;
    console.log('teste')
    $('html, body').animate(
    {
        scrollTop: posicaoPlacar + 'px'
    },15000);
    $('#number-score').text(scoreNumber);
});