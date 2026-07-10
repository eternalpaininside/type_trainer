import {chances, languages, punctation, texts} from "./config.js";
import {states} from "./states.js";

export const createRandomText = () => {
    let length = states.settings.mode === 'words'
        ? states.settings.words : 25;
    let wordsSinceLastNumber = 0;
    const words = [];

    if (states.settings.mode === 'text'){
        return texts[states.settings.language][states.settings.text][ Math.floor(Math.random() * texts[states.settings.language][states.settings.text].length)];
    }
    for (let i = 0; i < length; i++) {
        if (states.settings.toggles.includes("numbers") && Math.random() < chances.numberChance && !(wordsSinceLastNumber < 2)) {
            if (i !== 0){
                wordsSinceLastNumber = 0;
                words.push(generateRandomNumber());
                continue;
            }
        }

        let word = languages[states.settings.language][Math.floor(
            Math.random() * languages[states.settings.language].length,
            )];
        if (states.settings.toggles.includes("punctuations") && Math.random() < chances.punctuationChance) {
            word += punctation[Math.floor(Math.random() * punctation.length)];
        }
        if (states.settings.toggles.includes("capitals") && Math.random() < chances.capitalChance) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        wordsSinceLastNumber++;

        words.push(word);
    }

    return words.join(" ");
}

function generateRandomNumber() {
    let number = "";
    for (let j = 0; j < 3; j++) {
        if (j === 0)
            number += String(1 + randInt());
        else
            number += String(randInt());
    }
    if (Math.random() < chances.fourthNumberChance) {
        number += String(randInt());
    }
    if (Math.random() < chances.negativeNumberChance) {
        number = "-" + number;
    }

    return number;
}

function randInt(){
    return Math.floor( Math.random() * 9 );
}
