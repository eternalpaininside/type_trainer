import {states} from "./states.js";
import {elements} from "./dom.js";
import {enterFocusMode} from "./focus-mode.js";
import {renderText, renderValueSwitcher} from "./render.js";
import {
    startTimer,
    startCounter,
    finishTraining,
    resetTraining,
    setToggle,
    setMode,
    setValue,
    restartGame
} from "./training.js";
import {createRandomText} from "./text.js";

const modeSwitcher = document.querySelectorAll('[data-mode]');
modeSwitcher.forEach(function (buttonMode) {
    buttonMode.addEventListener('click', function () {
        modeSwitcher.forEach(function (modeSwitcherElement) {
            modeSwitcherElement.classList.remove('active');
        });
        buttonMode.classList.add('active');

        setMode(buttonMode.dataset.mode);
        renderValueSwitcher();
        renderText();
    });
});

const toggleSwitcher = document.querySelectorAll('[data-toggle]');
toggleSwitcher.forEach(function (buttonToggle) {
    buttonToggle.addEventListener('click', function () {

        buttonToggle.classList.toggle('active');

        setToggle(buttonToggle.dataset.toggle)
        renderValueSwitcher();
        renderText();
    });
});

elements.valueSwitcherElement.addEventListener('click', function (event) {
    const button = event.target.closest('button');

    if (button === null){
        return;
    }
    setValue(button)
    renderValueSwitcher();
    renderText();
});

elements.restartButton.addEventListener('click', function() {
    document.querySelector('[data-mode="' + states.settings.mode + '"]').classList.remove('active');

    restartGame();
    renderValueSwitcher();
    renderText();

    document.querySelector('[data-mode="' + states.settings.mode + '"]').classList.add('active');

    elements.counterElement.textContent = "";
    elements.resultsScreen.classList.add('hidden');
    elements.gameScreen.classList.remove('hidden');

    for (let i = 0; i < elements.toggleSwitcherElement.children.length; i++) {
        elements.toggleSwitcherElement.children[i].classList.remove('active');
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === ' '){
        event.preventDefault();
    }
    if (event.key === 'Backspace'){
        if (states.test.index === 0){
            return;
        }

        const chars = elements.textElement.querySelectorAll('.char');
        chars[states.test.index].classList.remove('current');

        states.test.typedTextLength--;
        states.test.index--;

        if (chars[states.test.index].classList.contains('wrong')){
            states.test.currentCountErrors--;
        }

        chars[states.test.index].classList.remove('wrong');
        chars[states.test.index].classList.remove('correct');
        chars[states.test.index].classList.add('current');

        states.test.typedCount--;
        return;
    }

    if (event.key.length !== 1){
        return;
    }
    if (states.test.isFinished){
        return;
    }
    if (!states.test.isStarted){
        states.test.isStarted = true;
        if (states.settings.mode === 'time'){
            startTimer()
        }else if (states.settings.mode === 'words' || states.settings.mode === 'text'){
            startCounter()
        }
    }

    enterFocusMode();
    const typedChar = event.key;
    const expectedChar = states.test.text[states.test.index];

    const chars = elements.textElement.querySelectorAll('.char');
    let currentCharElement = chars[states.test.index];

    states.test.typedCount++;
    states.test.typedTextLength++;

    currentCharElement.classList.remove('current');
    if (typedChar === expectedChar){
        currentCharElement.classList.add('correct');
    }else{
        states.test.errors++;
        states.test.currentCountErrors++;
        currentCharElement.classList.add('wrong');
    }

    states.test.index++;

    if (states.test.index >= states.test.text.length){
        if (states.settings.mode === 'time'){
            const newText = createRandomText();
            const oldLength = states.test.text.length;
            states.test.text += " " + newText;
            renderText(newText, oldLength);
        }else if (states.settings.mode === 'words' || states.settings.mode === 'text'){
            finishTraining();
        }
        return;
    }

    chars[states.test.index].classList.add('current');
});

elements.generateElement.addEventListener('click', function () {
    resetTraining();
    renderText();
});

elements.selectTriggerElement.addEventListener('click', function () {
    elements.selectMenuElement.classList.remove('close-mode');
    document.addEventListener('click', function (event) {
        if (event.target !== elements.selectTriggerElement.children[0] &&
        event.target !== elements.selectTriggerElement.children[1]){
            elements.selectMenuElement.classList.add('close-mode');
        }
    });
});

const languageOptions = document.querySelectorAll('[data-language]');
languageOptions.forEach(function (option) {
    option.addEventListener('click', function () {
        states.settings.language = option.dataset.language;
        elements.currentLanguageElement.textContent = option.textContent;
        resetTraining();
        renderText();
    });
});
