import {states, elements} from "./objects.js";
import {enterFocusMode} from "./focus-mode.js";
import {renderText, renderValueSwitcher} from "./render.js";
import {startTimer, startCounter, finishTraining, resetTraining} from "./training.js";
import {createRandomText} from "./text.js";

const modeSwitcher = document.querySelectorAll('[data-mode]');
modeSwitcher.forEach(function (buttonMode) {
    buttonMode.addEventListener('click', function () {
        modeSwitcher.forEach(function (modeSwitcherElement) {
            modeSwitcherElement.classList.remove('active');
        });

        buttonMode.classList.add('active');
        states.currentMode = buttonMode.dataset.mode;

        resetTraining();
        renderValueSwitcher();
    });
});

const toggleSwitcher = document.querySelectorAll('[data-toggle]');
toggleSwitcher.forEach(function (buttonToggle) {
    buttonToggle.addEventListener('click', function () {

        buttonToggle.classList.toggle('active');
        if (buttonToggle.classList.contains('active')){
            states.currentToggle.push(buttonToggle.dataset.toggle);
        }else{
            states.currentToggle = states.currentToggle.filter(function (toggle) {
                return toggle !== buttonToggle.dataset.toggle;
            });
        }

        resetTraining();
        renderValueSwitcher();
    });
});

function handleKeyDown(event) {
    if (event.key === ' '){
        event.preventDefault();
    }
    if (event.key === 'Backspace'){
        if (states.currentIndex === 0){
            return;
        }

        const chars = elements.textElement.querySelectorAll('.char');
        chars[states.currentIndex].classList.remove('current');
        states.typedText = states.typedText.slice(0, states.typedText.length - 1);

        states.currentIndex--;

        if (chars[states.currentIndex].classList.contains('wrong')){
            states.currentCountErrors--;
        }

        chars[states.currentIndex].classList.remove('wrong');
        chars[states.currentIndex].classList.remove('correct');
        chars[states.currentIndex].classList.add('current');

        states.typedCount--;
        return;
    }

    if (event.key.length !== 1){
        return;
    }
    if (states.isFinished){
        return;
    }
    if (!states.isStarted){
        states.isStarted = true;
        if (states.currentMode === 'time'){
            startTimer()
        }else if (states.currentMode === 'words'){
            startCounter()
        }
    }

    enterFocusMode();
    const typedChar = event.key;
    states.typedText += typedChar;
    const expectedChar = states.currentText[states.currentIndex];

    const chars = elements.textElement.querySelectorAll('.char');
    let currentCharElement = chars[states.currentIndex];

    states.typedCount++;

    currentCharElement.classList.remove('current');
    if (typedChar === expectedChar){
        currentCharElement.classList.add('correct');
    }else{
        states.errors++;
        states.currentCountErrors++;
        currentCharElement.classList.add('wrong');
    }

    states.currentIndex++;

    if (states.currentIndex >= states.currentText.length){
        if (states.currentMode === 'time'){
            const newText = createRandomText(0,
                elements.languageSelectElement.value,
                states.currentToggle);
            const oldLength = states.currentText.length;
            states.currentText += " " + newText;
            renderText(newText, oldLength);
        }else if (states.currentMode === 'words'){
            finishTraining();
        }
        return;
    }

    chars[states.currentIndex].classList.add('current');
}

elements.resetButton.addEventListener('click', function() {
    resetTraining();
    elements.counterElement.textContent = "";

    elements.resultsScreen.classList.add('hidden');
    elements.gameScreen.classList.remove('hidden');
});

elements.generateElement.addEventListener('click', function () {
    resetTraining();
});

document.addEventListener('keydown', handleKeyDown);

elements.languageSelectElement.addEventListener('change', function () {
    resetTraining();
});
