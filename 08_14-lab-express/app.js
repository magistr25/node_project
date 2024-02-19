// Импортируем необходимые модули
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import fs from 'fs';

// Создаем экземпляр приложения Express
const app = express();

// Используем middleware для парсинга данных из тела запроса и middleware для сессий
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat', // Секретный ключ для подписи сессии
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        httpOnlyy: true,
        secure: false,
        maxAge: 60000 }, // Время жизни сессии в миллисекундах

}));

// Инициализируем массив пользователей, который будет использоваться для хранения данных
let users = [];

// Пытаемся загрузить данные из файла db.json при старте сервера
try {
    const data = fs.readFileSync('db.json', 'utf8');
    const jsonData = JSON.parse(data);
    if (jsonData.users) {
        users = jsonData.users;
    }
} catch (err) {
    console.error('Error reading db.json:', err.message);
}

// Обработчик GET запроса для корневого маршрута
app.get('/', (req, res) => {
    if (req.session.username) {
        // Если пользователь залогинен, увеличиваем счетчик просмотров

        req.session.views = (req.session.views || 0) + 1;
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.write(`<p>Привет, ${req.session.username}!</p>`);
        res.write(`<p>Просмотров: ${req.session.views}</p>`);
        res.write(`<p>Истекает: ${Math.round(req.session.cookie.maxAge / 1000)} сек</p>`);
        res.write('<form action="/logout" method="post"><button type="submit">Выйти</button></form>');
        res.end();
    } else {
        // Если пользователь не залогинен, выводим формы для входа и регистрации

        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.write('<form action="/login" method="post">');
        res.write('<label>Имя пользователя: <input type="text" name="username"></label>');
        res.write('<button type="submit">Войти</button>');
        res.write('</form>');
        res.write('<form action="/register" method="post">');
        res.write('<label>Имя пользователя: <input type="text" name="username"></label>');
        res.write('<button type="submit">Зарегистрироваться</button>');
        res.write('</form>');
        res.end('Добро пожаловать в демо по сессиям!');
    }
});

// Middleware для обновления счетчика и времени истечения сессии каждые 60 секунд
app.use((req, res, next) => {
    if (req.session.username && req.session.cookie.expires) {
        // Если пользователь залогинен и время истечения сессии установлено
        const currentTime = Date.now();
        const expirationTime = req.session.cookie.expires.getTime();

        // Проверяем, прошло ли 60 секунд с последнего обновления
        if (currentTime - expirationTime > 60000) {
            // Обновляем счетчик и время истечения сессии
            req.session.views = 0;
            req.session.cookie.expires = new Date(currentTime + 60000);
            req.session.cookie.maxAge = 60000;
        }
    }

    next();
});

// Обработчик POST запроса для входа пользователя
app.post('/login', (req, res) => {
    const { username } = req.body;

    // Проверка наличия пользователя в db.json
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        req.session.username = username;
        req.session.views = 1;
        res.redirect('/');
    } else {
        res.send('Необходимо зарегистрироваться');
    }
});

// Обработчик POST запроса для регистрации пользователя
app.post('/register', (req, res) => {
    const { username } = req.body;
    users.push({ username });
    saveData(); // Сохранение данных в файл db.json
    req.session.username = username;
    req.session.views = 1;
    res.redirect('/');
});

// Обработчик POST запроса для выхода пользователя (удаление сессии)
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Функция для сохранения данных в файл db.json
function saveData() {
    const data = JSON.stringify({ users });
    fs.writeFileSync('db.json', data, 'utf8');
}

// Запускаем сервер на порту 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

