import express from 'express'
import session from 'express-session'
const app = express()

// Используем промежуточное ПО для работы с сессией
app.use(session({
    secret: 'keyboard cat',
    cookie: {maxAge: 60000},
    resave: false,
    saveUnitialized: true,
}))

// Подключение к сессии как к req.session
app.get('/', function (req, res, next) {
   if(req.session.views){
       req.session.views++
       res.setHeader('Content-Type', 'text/html; charset=UTF-8')
       res.write('<p>просмотров: ' + req.session.views + '</p>')
       res.write('<p>истекает: ' + Math.round(req.session.cookie.maxAge / 1000) + 'сек</p>')
       res.end()
   } else {
       req.session.views = 1
       res.setHeader('Content-Type', 'text/html; charset=UTF-8')
       res.end('Добро пожаловать в демо по сессиям! Обновите страницу')
   }
})
app.listen(3000)