import {states} from "./states.js";
import {elements} from "./dom.js";
import {exitFocusMode} from "./focus-mode.js";
import {createRandomText} from "./text.js";


export function startTimer() {
    if (states.ui.counterId !== null){
        return;
    }

    states.test.timeLeft = states.settings.time;
    states.ui.counterId = setInterval(function (){
        states.test.timeLeft--;
        elements.counterElement.textContent = String(states.test.timeLeft);

        if (states.test.timeLeft <= 0){
            finishTraining();
        }
    }, 1000);
}

export function startCounter() {
    if (states.ui.counterId !== null){
        return;
    }

    states.ui.counterId = setInterval(function (){
        states.test.timeLeft++;
        elements.counterElement.textContent = String(states.test.timeLeft);

        if (states.test.index === states.test.text.length){
            finishTraining();
        }
    }, 1000)
}

export function finishTraining(){
    const stats = calculateStats();
    states.test.isFinished = true;

    clearInterval(states.ui.counterId)
    states.ui.counterId = null;

    elements.wpmElement.textContent = String(stats.wpm);
    elements.accuracyElement.textContent = String(stats.accuracy) + "%";
    elements.mistakesElement.textContent = String(states.test.errors);
    elements.timeElement.textContent = String(states.settings.mode === 'time' ? states.settings.time : states.test.timeLeft);
    elements.typeElement.textContent =  elements.selectTriggerElement.children[1].textContent + " "
        + states.settings.mode + " " +
        (states.settings.mode === 'time' ?
            String(states.settings.time) + "s" :
            (states.settings.mode === 'words' ?
                String(states.settings.words) :
                String(states.settings.text)))
            + " " + states.settings.toggles;
    elements.statsElement.textContent =  (states.test.typedTextLength - states.test.currentCountErrors) +
        " / " + states.test.currentCountErrors;


    states.timeLeft = 0;
    elements.gameScreen.classList.add('hidden');
    elements.resultsScreen.classList.remove('hidden');
}

export function calculateStats() {
    const spentTime = states.settings.mode === 'time' ?
        states.settings.time : states.test.timeLeft;
    const minutes = spentTime / 60;

    let wpm = 0;
    let accuracy = 100;

    if (states.test.typedCount > 0 && minutes > 0) {
        accuracy = Math.round(((states.test.typedCount - states.test.errors) / states.test.typedCount) * 100);

        const correctChars = states.test.typedCount - states.test.errors;
        wpm = Math.round((correctChars / 5 ) / minutes);
    }

    return {
        accuracy,
        wpm,
    };
}

export function resetTraining() {
    states.test.index = 0;
    states.test.errors = 0;
    states.test.currentCountErrors = 0;
    states.test.typedCount = 0;
    states.test.timeLeft = 0;


    states.test.isFinished = false;
    states.test.isStarted = false;

    states.test.typedTextLength = 0;
    states.test.text = createRandomText(states.settings.words,
        states.settings.language, states.settings.toggles);

    clearInterval(states.ui.counterId);
    clearTimeout(states.ui.settingsTimeoutId);
    states.ui.counterId = null;
    states.ui.settingsTimeoutId = null;
    elements.counterElement.textContent = "";


    exitFocusMode();
}

export function setToggle(toggle) {
    if (states.settings.toggles.includes(toggle)){
        states.settings.toggles = states.settings.toggles.filter(function (tog) {
            return tog !== toggle;
        });
    }else{
        states.settings.toggles.push(toggle);
    }

    resetTraining();
}

export function setMode(mode) {
    states.settings.mode = mode;
    resetTraining();
}

export function setValue(button) {
    if (states.settings.mode === 'time'){
        states.settings.time = Number(button.dataset.time);
        states.settings.words = 25;
    }else if (states.settings.mode === 'words'){
        states.settings.words = Number(button.dataset.words);
    }else if (states.settings.mode === 'text'){
        states.settings.text = button.dataset.text;
    }

    resetTraining();
}

export function restartGame() {

    states.settings.toggles = [];
    states.settings.mode = 'time';
    states.settings.language = 'en';
    states.settings.time = 30;
    states.settings.words = 25;
    states.settings.text = 'medium';

    resetTraining();
}
