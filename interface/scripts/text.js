const russianWords = [
    "дом", "время", "человек", "работа", "день", "рука", "слово", "место",
    "жизнь", "глаз", "город", "вопрос", "сторона", "страна", "мир", "случай",
    "голова", "ребенок", "сила", "конец", "вид", "система", "часть", "ночь",
    "стол", "книга", "вода", "окно", "машина", "улица", "школа", "письмо",
    "мысль", "дорога", "друг", "голос", "сердце", "свет", "номер", "игра",
    "проект", "код", "сервер", "кнопка", "экран", "ошибка", "данные", "сайт"
];

const englishWords = [
    "dog", "time", "human", "work", "day", "hand", "word", "place",
    "life", "eye", "city", "question", "side", "country", "world", "chance",
    "head", "child", "power", "end", "view", "system", "part", "night",
    "table", "book", "water", "window", "car", "street", "school", "letter",
    "road", "other", "voice", "heart", "light", "number", "game", "project",
    "code", "server", "button", "screen", "error", "data", "site"
];

const punctation = [".", ",", "!", "?", ":", ";", "'"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const createRandomText = (wordCount = 25, lang = "ru", toggle = []) => {
    let length = 0;
    if (wordCount === 0){
        length = 25;
    }else {
        length = wordCount;
    }

    const words = [];
    if (lang === "ru"){
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * russianWords.length);
            words.push(russianWords[randomIndex]);
        }
    } else if (lang === "en"){
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * englishWords.length);
            words.push(englishWords[randomIndex]);
        }
    }else {
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * russianWords.length);
            words.push(russianWords[randomIndex]);
        }
    }

    return words.join(" ");
}