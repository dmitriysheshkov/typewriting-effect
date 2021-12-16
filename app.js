const typing = document.querySelector('.page-title__typing');

const texts = ['websites!', 'frontend!', 'backend!'];
let count = 0,
    index = 0,
    currentText = '',
    letter = '',
    direction = true;

function blinkCursor(callback, isStart) {
    console.log('Добавляю стиль');
    typing.classList.add('page-title__typing--cursor');

    let time;

    isStart ? time = 500 : time = 2000;

    setTimeout(callback, time);
}

function typeText() {

    if (index == 0 || index == currentText.length + 1) {
        console.log('Удаляю стиль');
        typing.classList.remove('page-title__typing--cursor');
    }

    if (count == texts.length) {
        count = 0;
    }

    currentText = texts[count];

    if (direction) {
        letter = currentText.slice(0, index++);
    } else {
        letter = currentText.slice(0, --index);
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

    setTimeout(typeText, 80);
}

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
