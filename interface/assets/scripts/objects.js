import { createRandomText } from "./text.js";

export const states = {
    currentMode: 'time',
    currentToggle: [],

    selectedTime: 30,
    selectedWords: 25,

    currentIndex: 0,
    currentText: createRandomText(25, "en"),
    typedText: '',

    counterId: null,
    settingsTimeoutId: null,
    currentCountErrors: 0,
    errors: 0,
    typedCount: 0,
    timeLeft: 0,

    isStarted: false,
    isFinished: false,
};

const element = (token) => document.getElementById(token);

export const elements = {
    gameScreen : element('game-screen'),
    valueSwitcherElement : element('value-switcher'),

    languageSelectElement : element('language-select'),
    counterElement : element('counter'),
    textElement : element('text'),
    generateElement : element('generate'),

    resultsScreen : element('results-screen'),

    wpmElement : element('wpm'),
    accuracyElement : element('accuracy'),

    typeElement : element('test-type'),
    mistakesElement : element('mistakes'),
    timeElement : element('time'),
    statsElement : element('stats'),

    resetButton : element('restart'),
};