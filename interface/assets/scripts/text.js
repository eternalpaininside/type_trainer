const languages = {
    ru : [ "дом", "время", "человек", "работа", "день", "рука", "слово", "место",
        "жизнь", "глаз", "город", "вопрос", "сторона", "страна", "мир", "случай",
        "голова", "ребенок", "сила", "конец", "вид", "система", "часть", "ночь",
        "стол", "книга", "вода", "окно", "машина", "улица", "школа", "письмо",
        "мысль", "дорога", "друг", "голос", "сердце", "свет", "номер", "игра",
        "проект", "код", "сервер", "кнопка", "экран", "ошибка", "данные", "сайт",
    ],
    en : ["dog", "time", "human", "work", "day", "hand", "word", "place",
        "life", "eye", "city", "question", "side", "country", "world", "chance",
        "head", "child", "power", "end", "view", "system", "part", "night",
        "table", "book", "water", "window", "car", "street", "school", "letter",
        "road", "other", "voice", "heart", "light", "number", "game", "project",
        "code", "server", "button", "screen", "error", "data", "site"],
    go : [ "append", "var", "delete", "type", "struct"]
}

const punctation = [".", ",", "!", "?", ":", ";"];

const numberChance = 0.2;
const punctuationChance = 0.2;
const capitalChance = 0.2;
const fourthNumberChance = 0.1;
const negativeNumberChance = 0.1;

export const createRandomText = (wordCount = 25, lang = "ru", toggle = []) => {
    let length = 0;
    if (wordCount === 0){
        length = 25;
    }else {
        length = wordCount;
    }

    let wordsSinceLastNumber = 0;
    const words = [];
    for (let i = 0; i < length; i++) {
        if (toggle.includes("numbers") && Math.random() < numberChance && !(wordsSinceLastNumber < 2)) {
            if (i !== 0){
                wordsSinceLastNumber = 0;
                words.push(generateRandomNumber());
                continue;
            }
        }

        let word = languages[lang][Math.floor(Math.random() * languages[lang].length)];
        if (toggle.includes("punctuations") && Math.random() < punctuationChance) {
            word += punctation[Math.floor(Math.random() * punctation.length)];
        }
        if (toggle.includes("capitals") && Math.random() < capitalChance) {
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
    if (Math.random() < fourthNumberChance) {
        number += String(randInt());
    }
    if (Math.random() < negativeNumberChance) {
        number = "-" + number;
    }

    return number;
}

function randInt(){
    return Math.floor( Math.random() * 10 );
}
