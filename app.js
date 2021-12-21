const body = document.querySelector('.body');
const sun = document.querySelector('.scene__sun');
const sunPhantom = document.querySelector('.scene__sun-phantom');
const startButton = document.getElementById('startButton');
const modal = document.querySelector('.modal');
const typing = document.querySelector('.page-title__typing');
const sounds = document.querySelectorAll('.sound');
const bgMusic = document.getElementById('bgMusic');

const texts = ['Любимая, Натали!', 'Любимая, мама!', 'Наша жизнь обретает смысл', 'только тогда,', 'когда ты рядом.', 'Ты навсегда в нашем сердце.', 'Только когда ты рядом,', 'жизнь становится по-настоящему прекрасной!', 'Любим тебя очень!', 'Очень сильно любим!', 'С наступающим тебя Новым 2022 годом!', 'Урррррррааааа!!!'];
let count = 0,
    index = 0,
    keySound = Math.floor(Math.random() * (sounds.length - 1)) + 1,
    keyPressTime = 80,
    currentText = '',
    letter = '',
    direction = true;

sunPhantom.addEventListener('click', ()=> body.classList.toggle('dark') );

function start() {
    modal.classList.remove('modal__show');
    modal.classList.add('modal__hide');

    bgMusic.play();
    blinkCursor(typeText, 1);
}

function blinkCursor(callback, isStart) {
    typing.classList.add('page-title__typing--cursor');

    let phrasePauseTime;

    if (isStart ) {
        phrasePauseTime = 500;
    } else {
        phrasePauseTime = 1000;
    }

    // isStart ? phrasePauseTime = 500 : phrasePauseTime = 1000;

    setTimeout(callback, phrasePauseTime);
}

function typeText() {

    if (index == 0 || index == currentText.length + 1) {
        typing.classList.remove('page-title__typing--cursor');
    }

    if (count == texts.length) {
        count = 0;
    }

    currentText = texts[count];

    sounds[keySound].pause();
    sounds[keySound].currentTime = 0;

    if (direction) {
        letter = currentText.slice(0, index++);
        keySound = Math.floor(Math.random() * (sounds.length - 1)) + 1;
        keyPressTime = Math.floor(Math.random() * (100 - 1)) + 50;
        sounds[keySound].play();
    } else {
        letter = currentText.slice(0, --index);

        keySound = 0;
        if (currentText.length == index) {
            sounds[keySound].play();
        }
        keyPressTime = 50;
    }
    
    typing.textContent = letter;
    
    

    if (index === currentText.length + 1) {
        direction = false;
        return  blinkCursor(typeText, 0);
    }
    
    if (index === 0) {
        direction = true;
        count++;
        return blinkCursor(typeText, 1);
    }

    setTimeout(typeText, keyPressTime);
}

bgMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

startButton.addEventListener('click', start);
