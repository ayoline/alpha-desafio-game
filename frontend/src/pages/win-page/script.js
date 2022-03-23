// var confettiSettings = { target: 'my-canvas' };
// var confetti = new ConfettiGenerator(confettiSettings);
// confetti.render();
const audioCongrats = $("#congrats")[0];

// let section = document.querySelector('section');
// window.addEventListener('scroll', function () {
//     let text = document.querySelector('.text');
//     let innerText = document.querySelector('.innerText');
//     let value = window.scrollY;
//     section.style.clipPath = 'circle(' + value + 'px at center center)';
//     text.style.left = 100 - value / 5 + '%';
//     innerText.style.left = 100 - value / 5 + '%';
// });

$(function () {
    let scoreNumber = window.location.search.split("=")[1];

    setTimeout(() => {
        let posicaoPlacar = $('button').offset().top;
        $('html, body').animate(
            {
                scrollTop: posicaoPlacar + 'px'
            }, 2000);
        $('#number-score').text(scoreNumber);
    }, 2000);

});

$('#home-btn').on('click', function () {
    window.location.href = 'http://localhost:3001';
});

$(function () {
    audioCongrats.play();
    audioCongrats.loop = true;
});

$('audio').prop('volume', 0.1);