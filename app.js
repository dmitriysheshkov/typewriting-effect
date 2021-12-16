const typing = document.querySelector('.page-title__typing');

const texts = ['websites!', 'frontend!', 'backend!'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
let direction = true;

function typeText() {

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

    if (index == currentText.length + 1) {
        direction = false;
    }
    
    if (index == 0) {
        direction = true;
        count++;
    }

    setTimeout(typeText, 100);
}

typeText();
