import http from "http";
import formidable from "formidable";

//const hostname = 'process.env.HOSTNAME || '0.0.0.0';
const hostname = '127.0.0.1';
const port = 3000;

const server =
    http.createServer( async(req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        // console.log(req.constructor)
        // console.log(res.constructor)
        // console.log(req.headers)
        //
        // console.log(new URL(req.url, `http://${req.headers.host}`))
        // console.log(req.httpVersion)
        // console.log(req.url)
        // console.log(req.method)

        if (req.method === 'GET' && req.url === '/') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html;charset=UTF-8')
            res.end(`
                <link rel="icon" href="data:;base64,=">
                <style>*{font-family: sans-serif}</style>
                <h1>Главная</h1>
                <a href='/'>Главная</a> <a href='/page'>Страница с формой</a><br/>
                `);
            return
        }



        if (req.method === 'GET' && req.url === '/page') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html;charset=UTF-8')
            res.end(`
                <link rel="icon" href="data:;base64,=">
                <style>*{font-family: sans-serif}</style>
                <h1>Страница с формой</h1>
                <a href='/'>Главная</a> <a href='/page'>Страница с формой</a><br/>
                <form action="/page" method="post" enctype="multipart/form-data">
                    <input type="text" name = 'firstName'><br>
                    <input type="password" name = 'pass'><br>
                    <input type="file" name = 'photo'><br>
                    <input type="hidden" name = 'param' value='secret'><br>
                    <button>Отправить</button>
                </form>
                `);
            return
        }

        if (req.method === 'POST' && req.url === '/page') {
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                res.end(body);
            });
            return
        }

        //Страница с Get-параметрами (видео 14, 40:27)
        let url = new URL(req.url, `http://${req.headers.host}`)

        if (req.method === 'GET' && url.pathname === '/page') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html;charset=UTF-8')
            res.end(`
                <link rel="icon" href="data:;base64,=">
                <style>*{font-family: sans-serif}</style>
                <h1>Страница с Get-параметрами/h1>
                <a href='/'>Главная</a> <a href='/page'>Страница с формой</a><br/>
                <pre>${url.search}</pre>
                <pre>${url.searchParams.get('q')}</pre>
                <pre>${url.searchParams.get('text')}</pre>
                `);
            return
        }

        // переадресация (лаба 20)
        if(req.method === "GET" && url.pathname === "/addToBasket"){
            res.statusCode = 303;
            const id = parseInt(url.searchParams.get('id'))

            // полезная работа (например, запись в БД)
            console.log(`запись в базу данных товара под номером ${id}`)


            res.setHeader('Location' , 'http://127.0.0.1:3000/page?text='+id);
            res.end();
            return;

        }

        // рефреш, лаба 21

        if(req.method === "GET" && url.pathname === "/timeout") {
            res.statusCode = 200;
            res.setHeader('Refresh', '10;url=http://127.0.0.1:3000/page?text=redirect');
            res.setHeader('Contrnt-Type', 'text/html; charset=UTF-8');
            res.end(`
            <div id=time></div>
            <script>
            let i = 0, steps = 10, duraton = 1000;
            function  tick() {
                if(i < steps-1){
                    i++;
                time.innerHTML = 10 - i + 'сек';
                setTimeout(tick, duraton)
                }
            }
            setTimeout(tick, 0)
            </script>
            `);

            return;
        }



        //лаба22 (браузер будет сохранять файл price.html(прайс-лист) при заходе на страницу)

        if(req.method === "GET" && url.pathname === "/price") {
            res.statusCode = 200;
            res.setHeader('Content-Disposition','attachment; filename = "price.html"');
            res.setHeader('Contrnt-Type', 'text/html; charset=UTF-8');

            let items = [
                {id:123, title: 'Товар1', price: 1000},
                {id:124, title: 'Товар1', price: 2000},
                {id:127, title: 'Товар1', price: 3000},
            ]

            let content ='';

            items.forEach( (item) =>
                (content += `<div>
                <h3>${item.title}</h3>
                <p>Цена: ${item.price}</p>

            </div>`)
        );

            res.end(content);

            return;
        }


        //лаба 23 -25 работа formidable

        if (req.url === '/api/upload' && req.method.toLowerCase() === 'get') {
            res.writeHead(200, {'ContentType': 'text/html; charset = UTF-8'});
            res.end(`
                <form action="/api/upload" method = "post" enctype="multipart/form-data">
                <input type="file" name="filename" value="">
                <button>Отправить</button>
                </form>
            `)

            return;
        }

        if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
            const form = formidable({multiples: true});

            form.parse(req, (err, fields, files) => {
                if (err){
                    res.writeHead(err.httpCode || 400, {'ContentType': 'text/plain'});
                    res.end(String(err));
                    return;
                }
                res.writeHead(200, {'ContentType': 'application/json'});
                res.end(JSON.stringify({fields, files}, null, 2));
                return;
            });

        }

        //лаба 26

        if(req.method === "GET" && url.pathname === "/users") {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');

            let users = await fetch('https://jsonplaceholder.typicode.com/users')
                .then(response=>response.json())


            let content ='';

            users.forEach(
                ({name,email,website}) =>
                ( content += `<div>
                <h3>${name}</h3>
                <p>Емэйл: ${ email }</p>
                 <p>Сайт: ${ website }</p>
            </div>`));

            res.end(content);

            return;
        }


   });

server.listen(port, hostname, () => {
    console.log(`Сервер работает на http://${hostname}:${port}/`)
})