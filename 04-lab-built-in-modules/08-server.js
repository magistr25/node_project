import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 
    'Content-Type': 'application/json',
    'X-Author': 'Alex',
   });
//   console.log(res.constructor)
  res.end(JSON.stringify({
    data: 'Привет, мир!',
  }));
});

server.listen(8000);