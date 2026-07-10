const element = (token) => document.getElementById(token);

export const elements = {
    gameScreen : element('game-screen'),
    valueSwitcherElement : element('value-switcher'),
    toggleSwitcherElement : element('toggle-switcher'),

    selectTriggerElement : element('select-trigger'),
    selectMenuElement : element('select-menu'),
    currentLanguageElement : element('current-language'),
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

    restartButton : element('restart'),
};