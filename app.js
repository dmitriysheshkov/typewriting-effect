const typing = document.querySelector('.page-title__typing');
const sounds = document.querySelectorAll('.sound');
const bgMusic = document.getElementById('bgMusic');

const texts = ['Любимая, Натали!', 'Моя жизнь обретает смысл', 'только тогда,', 'когда ты рядом.', 'Ты навсегда в моем сердце.', 'Только когда ты рядом,', 'жизнь становится прекрасной!'];
let count = 0,
    index = 0,
    keySound = Math.floor(Math.random() * (sounds.length - 1)) + 1,
    keyPressTime = 80,
    currentText = '',
    letter = '',
    direction = true;

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

bgMusic.play();

blinkCursor(typeText, 1);


// function pause(callback) {
//     console.log('Добавляю стиль');
//     setTimeout(callback, 2000);
// }

// function doIt() {
//     console.log('Удаяю стиль');
//     console.log(count++);

//     pause(doIt);
// }

// pause(doIt);
