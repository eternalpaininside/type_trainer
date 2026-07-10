import {states} from "./states.js";
import {elements} from "./dom.js";
import {modeValues} from "./config.js";

export function renderValueSwitcher() {
    elements.valueSwitcherElement.innerHTML = '';
    const values = modeValues[states.settings.mode];

    values.forEach(function (value) {
        const button = document.createElement('button');

        button.classList.add('btn-mode');
        button.textContent = String(value);

        if (states.settings.mode === 'time') {
            elements.toggleSwitcherElement.classList.remove('hidden');
            button.dataset.time = String(value);

            if (value === states.settings.time){
                button.classList.add('active');
            }
        } else if (states.settings.mode === 'words'){
            elements.toggleSwitcherElement.classList.remove('hidden');
            button.dataset.words = String(value);

            if (value === states.settings.words){
                button.classList.add('active');
            }
        } else if (states.settings.mode === 'text'){
            states.settings.toggles = [];
            elements.toggleSwitcherElement.classList.add('hidden');
            button.dataset.text = String(value);

            if (value === states.settings.text){
                button.classList.add('active');
            }
        }


        button.addEventListener('click', function () {
            button.classList.add('active');

            if (states.settings.mode === 'time') {
                states.settings.time = value;
                states.settings.words = 25;
                states.settings.text = 'medium';
            }else if (states.settings.mode === 'words'){
                states.settings.words = value;
                states.settings.time = 30;
                states.settings.text = 'medium';
            }else if (states.settings.mode === 'text'){
                states.settings.text = value;
                states.settings.time = 30;
                states.settings.words = 25;
            }

            renderValueSwitcher();
        });

        elements.valueSwitcherElement.appendChild(button);
    });
}

export function renderText() {
    let globalIndex = 0;
    let newText = states.test.text;
    elements.textElement.innerHTML = '';


    if (elements.textElement.textContent === ""){
        globalIndex = 0;
    } else {
        globalIndex = elements.textElement.textContent.length;
    }

    const words = newText.split(' ');

    for (let i = 0; i < words.length; i++) {
        const spanWord = document.createElement('span');
        const word = words[i];

        for (let j = 0; j < word.length; j++) {
            const spanChar = document.createElement('span');
            spanChar.textContent = word[j];
            spanChar.classList.add('char');

            if (globalIndex === states.test.index){
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

    if (index === states.test.index){
        space.classList.add('current');
    }

    word.appendChild(space);
}
