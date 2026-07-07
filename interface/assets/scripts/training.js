import {elements, states} from "./objects.js";
import {exitFocusMode} from "./focus-mode.js";
import {createRandomText} from "./text.js";
import {renderText} from "./render.js";


export function startTimer() {
    if (states.counterId !== null){
        return;
    }

    states.timeLeft = states.selectedTime;
    states.counterId = setInterval(function (){
        states.timeLeft--;
        elements.counterElement.textContent = String(states.timeLeft);

        if (states.timeLeft <= 0){
            finishTraining();
        }
    }, 1000);
}

export function startCounter() {
    if (states.counterId !== null){
        return;
    }

    states.counterId = setInterval(function (){
        states.timeLeft++;
        elements.counterElement.textContent = String(states.timeLeft);

        if (states.currentIndex === states.currentText.length){
            finishTraining();
        }
    }, 1000)
}

export function finishTraining(){
    const stats = calculateStats();
    states.isFinished = true;

    clearInterval(states.counterId)
    states.counterId = null;

    elements.wpmElement.textContent = String(stats.wpm);
    elements.accuracyElement.textContent = String(stats.accuracy) + "%";
    elements.mistakesElement.textContent = String(states.errors);
    elements.timeElement.textContent = String(states.currentMode === 'time' ? states.selectedTime : states.timeLeft);
    elements.typeElement.textContent =  elements.languageSelectElement.value + " "
        + states.currentMode + " " +
        (states.currentMode === 'time' ?
            String(states.selectedTime) + "s " :
            String(states.selectedWords) + " ") +
        states.currentToggle;
    elements.statsElement.textContent =  (states.typedText.length - states.currentCountErrors) +
        " / " + states.currentCountErrors;


    states.timeLeft = 0;
    elements.gameScreen.classList.add('hidden');
    elements.resultsScreen.classList.remove('hidden');
}

export function calculateStats() {
    const spentTime = states.currentMode === 'time' ?
        states.selectedTime : states.timeLeft;
    const minutes = spentTime / 60;

    let wpm = 0;
    let accuracy = 100;

    if (states.typedCount > 0 && minutes > 0) {
        accuracy = Math.round(((states.typedCount - states.errors) / states.typedCount) * 100);

        const correctChars = states.typedCount - states.errors;
        wpm = Math.round((correctChars / 5 ) / minutes);
    }

    return {
        accuracy,
        wpm,
    };
}

export function resetTraining() {
    states.currentIndex = 0;
    states.errors = 0;
    states.currentCountErrors = 0;
    states.typedCount = 0;
    states.timeLeft = 0;


    states.isFinished = false;
    states.isStarted = false;

    states.typedText="";
    states.currentText = createRandomText(states.selectedWords,
        elements.languageSelectElement.value, states.currentToggle);

    clearInterval(states.counterId);
    clearTimeout(states.settingsTimeoutId);
    states.counterId = null;
    states.settingsTimeoutId = null;

    elements.counterElement.textContent = "";

    exitFocusMode();
    renderText();
}
