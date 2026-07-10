export const states = {

    settings: {
        mode: 'time',
        language: 'en',
        toggles : [],

        time : 30,
        words : 25,
        text : 'medium',
    },

    test : {
        text : "",
        typedTextLength : 0,
        index : 0,
        errors : 0,
        typedCount : 0,
        currentCountErrors : 0,
        timeLeft : 0,
        isStarted : false,
        isFinished : false,
    },

    ui : {
      counterId : null,
      settingsTimeoutId : null,
    },
};