import { createRandomText } from "./text.js";
import { enterFocusMode, exitFocusMode } from "./focus-mode.js";

const modeValues = {
    time: [15, 30, 60, 120],
    words: [10, 25, 50, 100]
};

const textElement = document.getElementById('text');
const counterElement = document.getElementById('counter');
const languageSelectElement = document.getElementById('language-select');

const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const timeElement = document.getElementById('time');
const mistakesElement = document.getElementById('mistakes');
const typeElement = document.getElementById('test-type');

const resetButton = document.getElementById('restart');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');


let currentMode = 'time';
let currentToggle = [];

let selectedTime = 30;
let selectedWords = 25;

let currentIndex = 0;
let currentText = createRandomText(selectedWords,
    languageSelectElement.value, currentToggle);

let counterId = null;
let errors = 0;
let typedCount = 0;
let timeLeft = 0;

let settingsTimeoutId = null;
let settingsTimer = null;

let isStarted = false;
let isFinished = false;

const valueSwitcherElement = document.getElementById( 'value-switcher');
function renderValueSwitcher() {
    valueSwitcherElement.innerHTML = '';

    const values = modeValues[currentMode];
    values.forEach(function (value) {
        const button = document.createElement('button');

        button.classList.add('btn-mode');
        button.textContent = String(value);

        if (currentMode === 'time') {
            button.dataset.time = String(value);
            if (value === selectedTime){
                button.classList.add('active');
            }
        } else if (currentMode === 'words'){
            button.dataset.words = String(value);
            if (value === selectedWords){
                button.classList.add('active');
            }
        }

        button.addEventListener('click', function () {
            button.classList.add('active');

            if (currentMode === 'time') {
                selectedTime = value;
                selectedWords = 25;
            }else if (currentMode === 'words'){
                selectedWords = value;
                selectedTime = 30;
            }

            resetTraining();
            renderValueSwitcher();
        });

        valueSwitcherElement.appendChild(button);
    });
}

const modeSwitcher = document.querySelectorAll('[data-mode]');
modeSwitcher.forEach(function (buttonMode) {
    buttonMode.addEventListener('click', function () {
        modeSwitcher.forEach(function (modeSwitcherElement) {
            modeSwitcherElement.classList.remove('active');
        });

        buttonMode.classList.add('active');
        currentMode = buttonMode.dataset.mode;

        resetTraining();
        renderValueSwitcher();
    });
});

const toggleSwitcher = document.querySelectorAll('[data-toggle]');
toggleSwitcher.forEach(function (buttonToggle) {
    buttonToggle.addEventListener('click', function () {

        buttonToggle.classList.toggle('active');
        if (buttonToggle.classList.contains('active')){
            currentToggle.push(buttonToggle.dataset.toggle);
        }else{
            currentToggle = currentToggle.filter(function (toggle) {
                return toggle !== buttonToggle.dataset.toggle;
            });
        }

        resetTraining();
        renderValueSwitcher();
    });
});

function renderText(text = "", startIndex = 0) {
    let globalIndex = 0;
    let newText = "";
    if (text !== ""){
        globalIndex = startIndex;
        newText = text;
    }else{
        textElement.innerHTML = '';
        newText = currentText;
    }
    const words = newText.split(' ');

    for (let i = 0; i < words.length; i++) {
        const spanWord = document.createElement('span');
        const word = words[i];

        for (let j = 0; j < word.length; j++) {
            const spanChar = document.createElement('span');
            spanChar.textContent = word[j];
            spanChar.classList.add('char');

            if (globalIndex === currentIndex){
                spanChar.classList.add('current');
            }

            spanWord.appendChild(spanChar);
            globalIndex++;
        }


        spanWord.classList.add('word');
        addSpace(spanWord, globalIndex);
        globalIndex++;

        textElement.appendChild(spanWord);
    }
}

function addSpace(word, index) {
    const space = document.createElement('span');
    space.textContent = '\u00A0';
    space.classList.add('char');

    if (index === currentIndex){
        space.classList.add('current');
    }

    word.appendChild(space);
}

function startTimer() {
    if (counterId !== null){
        return;
    }

    timeLeft = selectedTime;
    counterId = setInterval(function (){
        timeLeft--;
        counterElement.textContent = timeLeft;

        if (timeLeft <= 0){
            finishTraining();
        }
    }, 1000);
}

function startCounter() {
    if (counterId !== null){
        return;
    }

    counterId = setInterval(function (){
        timeLeft++;
        counterElement.textContent = timeLeft;

        if (currentIndex === currentText.length){
            finishTraining();
        }
    }, 1000)
}

function finishTraining(){
    const stats = calculateStats();
    isFinished = true;

    clearInterval(counterId)
    counterId = null;


    wpmElement.textContent = String(stats.wpm);
    accuracyElement.textContent = String(stats.accuracy) + "%";
    mistakesElement.textContent = errors;
    timeElement.textContent = String(currentMode === 'time' ? selectedTime : timeLeft);
    typeElement.textContent =  languageSelectElement.value + " " + currentMode + " " +
        (currentMode === 'time' ? String(selectedTime) + "s " : String(selectedWords) + " ") +
        currentToggle;


    timeLeft = 0;
    gameScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
}

function calculateStats() {
    const spentTime = currentMode === 'time' ? selectedTime : timeLeft;
    const minutes = spentTime / 60;

    let wpm = 0;
    if (minutes > 0) {
        const correctChars = typedCount - errors;
        wpm = Math.round((correctChars / 5 ) / minutes);
    }

    let accuracy = 100;
    if (typedCount > 0) {
        accuracy = Math.round(((typedCount - errors) / typedCount) * 100);
    }

    return {
        accuracy,
        wpm
    };
}

function resetTraining() {
    currentIndex = 0;
    errors = 0;
    typedCount = 0;

    isFinished = false;
    isStarted = false;
    timeLeft = 0;
    settingsTimer = 0;

    clearInterval(counterId);
    counterId = null;
    settingsTimeoutId = null;

    exitFocusMode();
    currentText = createRandomText(selectedWords,
        languageSelectElement.value, currentToggle);
    renderText();
}

function handleKeyDown(event) {
    if (event.key === 'Backspace'){
        if (currentIndex === 0){
            return;
        }

        const chars = textElement.querySelectorAll('.char');
        chars[currentIndex].classList.remove('current');

        currentIndex--;

        chars[currentIndex].classList.remove('correct');
        chars[currentIndex].classList.remove('wrong');
        chars[currentIndex].classList.add('current');

        typedCount--;
        return;
    }

    if (event.key.length !== 1){
        return;
    }
    if (isFinished){
        return;
    }
    if (!isStarted){
        isStarted = true;
        if (currentMode === 'time'){
            startTimer()
        }else if (currentMode === 'words'){
            startCounter()
        }
    }

    enterFocusMode();
    const typedChar = event.key;
    const expectedChar = currentText[currentIndex];

    const chars = textElement.querySelectorAll('.char');
    let currentCharElement = chars[currentIndex];

    typedCount++;

    currentCharElement.classList.remove('current');
    if (typedChar === expectedChar){
        currentCharElement.classList.add('correct');
    }else{
        errors++;
        currentCharElement.classList.add('wrong');
    }

    currentIndex++;

    if (currentIndex >= currentText.length){
        if (currentMode === 'time'){
            const newText = createRandomText(0,
                languageSelectElement.value,
                currentToggle);
            const oldLength = currentText.length;
            currentText += " " + newText;
            renderText(newText, oldLength);
        }else if (currentMode === 'words'){
            finishTraining();
        }
        return;
    }

    chars[currentIndex].classList.add('current');
}

resetButton.addEventListener('click', function() {
    resetTraining();
    counterElement.textContent = "";

    resultsScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
});

document.addEventListener('keydown', handleKeyDown);

languageSelectElement.addEventListener('change', function () {
    resetTraining();
});


document.addEventListener('mousemove', function () {
    if (isStarted && !isFinished) {
        exitFocusMode();
        clearTimeout(settingsTimeoutId);

        settingsTimeoutId = setTimeout(function () {
            enterFocusMode();
        }, 2000);
    }
});

renderText();
renderValueSwitcher();
