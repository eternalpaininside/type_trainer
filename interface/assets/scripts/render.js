import {states, elements} from "./objects.js";

const modeValues = {
    time: [15, 30, 60, 120],
    words: [10, 25, 50, 100]
};

export function renderValueSwitcher() {
    elements.valueSwitcherElement.innerHTML = '';

    const values = modeValues[states.currentMode];
    values.forEach(function (value) {
        const button = document.createElement('button');

        button.classList.add('btn-mode');
        button.textContent = String(value);

        if (states.currentMode === 'time') {
            button.dataset.time = String(value);
            if (value === states.selectedTime){
                button.classList.add('active');
            }
        } else if (states.currentMode === 'words'){
            button.dataset.words = String(value);
            if (value === states.selectedWords){
                button.classList.add('active');
            }
        }

        button.addEventListener('click', function () {
            button.classList.add('active');

            if (states.currentMode === 'time') {
                states.selectedTime = value;
                states.selectedWords = 25;
            }else if (states.currentMode === 'words'){
                states.selectedWords = value;
                states.selectedTime = 30;
            }

            renderValueSwitcher();
        });

        elements.valueSwitcherElement.appendChild(button);
    });
}

export function renderText(text = "", startIndex = 0) {
    let globalIndex = 0;
    let newText;
    if (text !== ""){
        globalIndex = startIndex;
        newText = text;
    }else{
        elements.textElement.innerHTML = '';
        newText = states.currentText;
    }
    const words = newText.split(' ');

    for (let i = 0; i < words.length; i++) {
        const spanWord = document.createElement('span');
        const word = words[i];

        for (let j = 0; j < word.length; j++) {
            const spanChar = document.createElement('span');
            spanChar.textContent = word[j];
            spanChar.classList.add('char');

            if (globalIndex === states.currentIndex){
                spanChar.classList.add('current');
            }

            spanWord.appendChild(spanChar);
            globalIndex++;
        }


        spanWord.classList.add('word');
        if (i !== words.length - 1){
            addSpace(spanWord, globalIndex);
            globalIndex++;
        }

        elements.textElement.appendChild(spanWord);
    }
}

function addSpace(word, index) {
    const space = document.createElement('span');
    space.textContent = '\u00A0';
    space.classList.add('char');

    if (index === states.currentIndex){
        space.classList.add('current');
    }

    word.appendChild(space);
}
