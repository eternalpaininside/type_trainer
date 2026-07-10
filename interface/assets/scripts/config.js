export const modeValues = {
    time: [15, 30, 60, 120],
    words: [10, 25, 50, 100],
    text: ['low', 'medium', 'high'],
};

export const chances = {
    numberChance: 0.2,
    punctuationChance: 0.2,
    capitalChance: 0.2,
    fourthNumberChance: 0.1,
    negativeNumberChance: 0.1,
};

export const languages = {
    ru: [
        "дом", "время", "человек", "работа", "день", "рука", "слово", "место",
        "жизнь", "глаз", "город", "вопрос", "сторона", "страна", "мир", "случай",
        "голова", "ребенок", "сила", "конец", "вид", "система", "часть", "ночь",
        "стол", "книга", "вода", "окно", "машина", "улица", "школа", "письмо",
        "мысль", "дорога", "друг", "голос", "сердце", "свет", "номер", "игра",
        "проект", "код", "сервер", "кнопка", "экран", "ошибка", "данные", "сайт",
        "память", "задача", "решение", "пример", "урок", "класс", "метод", "поле",
        "файл", "папка", "строка", "число", "массив", "список", "цикл", "условие",
        "функция", "модуль", "страница", "форма", "меню", "кнопка", "запрос",
        "ответ", "таблица", "ключ", "связь", "индекс", "ошибка", "проверка",
        "результат", "скорость", "точность", "печать", "буква", "символ", "пробел",
        "язык", "режим", "таймер", "текст", "словарь", "сервер", "клиент", "база",
        "данные", "запись", "пользователь", "профиль", "настройка", "интерфейс"
    ],

    en: [
        "dog", "time", "human", "work", "day", "hand", "word", "place",
        "life", "eye", "city", "question", "side", "country", "world", "chance",
        "head", "child", "power", "end", "view", "system", "part", "night",
        "table", "book", "water", "window", "car", "street", "school", "letter",
        "road", "other", "voice", "heart", "light", "number", "game", "project",
        "code", "server", "button", "screen", "error", "data", "site",
        "memory", "task", "result", "answer", "lesson", "class", "method", "field",
        "file", "folder", "string", "array", "list", "loop", "condition", "function",
        "module", "page", "form", "menu", "request", "response", "table", "key",
        "index", "check", "speed", "accuracy", "typing", "letter", "symbol", "space",
        "language", "mode", "timer", "text", "dictionary", "client", "database",
        "record", "user", "profile", "setting", "interface", "browser", "computer",
        "network", "style", "design", "logic", "state", "event", "handler", "render"
    ],

    go: [
        "break", "default", "func", "interface", "select",
        "case", "defer", "go", "map", "struct",
        "chan", "else", "goto", "package", "switch",
        "const", "fallthrough", "if", "range", "type",
        "continue", "for", "import", "return", "var",
        "append", "cap", "close", "complex", "copy",
        "delete", "imag", "len", "make", "new",
        "panic", "print", "println", "real", "recover",
        "int", "int8", "int16", "int32", "int64",
        "uint", "uint8", "uint16", "uint32", "uint64",
        "float32", "float64", "string", "bool", "error",
        "byte", "rune", "true", "false", "nil"
    ]
};

export const punctation = [".", ",", "!", "?", ":", ";"];

export const texts = {
    ru: {
        low: [
            "Сегодня хороший день для тренировки печати.",
            "Я пишу текст и стараюсь не ошибаться.",
            "Каждая буква должна быть нажата правильно.",
            "Этот режим помогает привыкнуть к клавиатуре.",
            "Сначала скорость маленькая но потом она растет.",
            "Важно печатать спокойно и смотреть на текст.",
            "Если ошибся можно начать заново.",
            "Тренировка каждый день дает хороший результат.",
            "Простой текст удобен для начала.",
            "Печатать быстро можно научиться постепенно."
        ],

        medium: [
            "Программирование требует внимания, терпения и постоянной практики.",
            "Когда пользователь выбирает режим, приложение должно обновить состояние.",
            "Интерфейс становится удобнее, если каждая часть отвечает только за свою задачу.",
            "Сервер получает запрос, обрабатывает данные и возвращает ответ клиенту.",
            "База данных хранит слова, результаты тренировок и настройки пользователя.",
            "Если разделить код на модули, проект становится проще расширять.",
            "Таймер запускается после первого нажатия клавиши и останавливается в конце теста.",
            "Ошибки нужно считать аккуратно, особенно если пользователь нажимает Backspace.",
            "Кнопки режима должны менять состояние приложения, а отрисовка должна только показывать результат.",
            "Хорошая архитектура помогает не запутаться, когда проект становится больше."
        ],

        high: [
            "Асинхронный запрос к серверу позволяет получать новый текст без перезагрузки страницы.",
            "Если состояние приложения хранится в одном объекте, его проще передавать между модулями.",
            "При проектировании интерфейса важно отделять бизнес-логику от визуального представления.",
            "Оптимизация кода начинается не с сокращения строк, а с понятного разделения ответственности.",
            "Когда пользователь завершает тест, система должна корректно посчитать скорость, точность и количество ошибок.",
            "Сложность проекта растет быстрее, чем кажется, поэтому архитектуру лучше продумывать заранее.",
            "Модуль генерации текста не должен знать о кнопках, DOM-элементах и состоянии экрана.",
            "Обработчики событий должны принимать действие пользователя и вызывать нужную функцию логики.",
            "Если серверная часть написана на Go, она может генерировать текст на основе слов из базы данных.",
            "Расширяемый проект позволяет легко добавить новые режимы, языки, статистику и сохранение результатов."
        ],
    },

    en: {
        low: [
            "Today is a good day for typing practice.",
            "I type words and try not to make mistakes.",
            "Every letter should be pressed correctly.",
            "This mode helps you learn the keyboard.",
            "Speed grows slowly with daily practice.",
            "Simple text is useful for beginners.",
            "You can restart the test at any moment.",
            "Good typing requires focus and patience.",
            "The screen shows words and the timer.",
            "Practice makes your result better."
        ],

        medium: [
            "Programming requires attention, patience, and regular practice.",
            "When the user changes the mode, the application should update its state.",
            "A clean interface is easier to understand and easier to improve.",
            "The server receives a request, processes data, and sends a response.",
            "The database stores words, results, and user settings.",
            "If the code is split into modules, the project becomes easier to extend.",
            "The timer starts after the first key press and stops when the test ends.",
            "Mistakes should be counted carefully, especially when the user presses Backspace.",
            "Mode buttons should change state, while render functions should only update the screen.",
            "Good architecture helps when the project becomes larger."
        ],

        high: [
            "An asynchronous request allows the client to receive new text without reloading the page.",
            "When application state is stored in one object, it becomes easier to share between modules.",
            "A scalable interface separates business logic from visual representation.",
            "Code optimization starts with clear responsibility, not with reducing the number of lines.",
            "When the user finishes the test, the system should calculate speed, accuracy, and mistakes correctly.",
            "Project complexity grows quickly, so architecture should be considered early.",
            "The text generation module should not know anything about buttons, DOM elements, or screen state.",
            "Event handlers should receive user actions and call the correct logic functions.",
            "If the backend is written in Go, it can generate text using words stored in a database.",
            "An extensible project makes it easy to add new modes, languages, statistics, and saved results."
        ],
    },

    go: {
        low: [
            "package main",
            "func main return",
            "var name string",
            "const count int",
            "if error return",
            "for range list",
            "type User struct",
            "map string int",
            "make slice append",
            "import fmt"
        ],

        medium: [
            "func main() { fmt.Println(\"hello\") }",
            "type User struct { Name string Age int }",
            "func add(a int, b int) int { return a + b }",
            "for index, value := range items { fmt.Println(index, value) }",
            "if err != nil { return err }",
            "users := make([]User, 0)",
            "scores := map[string]int{\"go\": 10}",
            "func handler(w http.ResponseWriter, r *http.Request)",
            "result, err := db.Exec(query)",
            "defer rows.Close()"
        ],

        high: [
            "func createUser(ctx context.Context, db *sql.DB, user User) error { return nil }",
            "type Repository interface { Save(ctx context.Context, user User) error }",
            "func (s *Service) Create(ctx context.Context, input CreateUserRequest) error { return s.repo.Save(ctx, user) }",
            "select { case value := <-ch: fmt.Println(value) case <-ctx.Done(): return }",
            "go func() { defer wg.Done(); worker(jobs, results) }()",
            "tx, err := db.BeginTx(ctx, nil); if err != nil { return err }",
            "rows, err := db.QueryContext(ctx, query, args...)",
            "func middleware(next http.Handler) http.Handler { return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { next.ServeHTTP(w, r) }) }",
            "type Server struct { router *http.ServeMux service *Service }",
            "func main() { log.Fatal(http.ListenAndServe(\":8080\", router)) }"
        ],
    },
};