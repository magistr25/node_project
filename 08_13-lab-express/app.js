import express from "express"

const app = express();

import fs from 'fs'


//Укажите использование статических файлов
app.use(express.static('public'))
// Настройка шаблонизатора Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Промежуточное ПО для обработки данных формы
app.use(express.urlencoded({ extended: true }));

// Обработчик GET запроса для отображения формы
app.get('/feedback', (req, res) => {
    res.render('feedback');
});

// Обработчик POST запроса для обработки отправленной формы
app.post('/submit-feedback', (req, res) => {
    // Здесь обработка отправленной формы
    // Например, сохранение обратной связи в базу данных или отправка на почту

    // Сохраняем данные из формы в файл messages.json
    const day = new Date()
    const feedbackData = {
        timestamp: {
            date: day.toLocaleDateString(),
            time: day.toLocaleTimeString()
        },
        feedback: req.body.feedback
    };

    fs.readFile('messages.json', 'utf8', (err, data) => {
        let messages = [];

        if (!err) {
            try {
                messages = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing messages.json:', parseError);
            }
        }

        messages.push(feedbackData);

        fs.writeFile('messages.json', JSON.stringify(messages), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to messages.json:', writeErr);
            }
        });
    });

    // В данном примере просто отправляем ответ с сообщением "Спасибо!"
    res.send('Спасибо за обращение!');

    // После успешной обработки POST запроса, устанавливаем задержку и перенаправляем на /feedback
    setTimeout(() => {
        res.redirect('/feedback');
    }, 10000); // 10000 миллисекунд = 10 секунд
});

// Обработчик корневого маршрута для предотвращения ошибки "Cannot GET /"
app.get('/', (req, res) => {
    res.render('feedback'); // Здесь можно изменить на что-то другое, например, редирект на /feedback
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
