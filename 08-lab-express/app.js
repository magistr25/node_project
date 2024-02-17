import express from "express"
import querystring from "query-string"
const app = express();

//Укажите использование статических файлов
app.use(express.static('public'))

//Настройте каталог для шаблонов. Укажите в качестве движка шаблонов Pug
app.set('views', './views');
app.set('view engine', 'pug');


//обработчики для страниц
app.get('/', function(req, res){
    //res.send('Hello, world')
    res.render('index', {items:['Ехал', 'Грека', 'через','реку']});
})

app.get('/ab*cd', function (req,res){
    res.send('ab*cd')
})

//получение параметра из маршрута и GET-параметра
app.get('/:name', function(req, res){
    console.log(req.params)
    console.log(req.query)
    const firstName = req.params.name ?? 'Грека'
    const placeholder = req.query.placeholder ?? 'реку'
    res.render('index', {items:['Ехал', firstName, 'через', placeholder]});
})



app.listen(3000)