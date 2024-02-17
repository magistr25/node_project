import mysql from 'mysql2'
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'mydb',
    user: 'root',
    password: '352918'
});

connection.connect()
connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) =>{
    if (err) throw err;
    console.log('Результат: ', rows[0].solution);
});

connection.execute(
    'SELECT * FROM `book` WHERE `title` = ? AND `price` > ?',
    ['Книга 5', 1000],
    (err,results, fields) => {
        console.log(results)
    }
);

connection.execute(
    'INSERT INTO `book` VALUES  (NULL, ?,?,?)',
    ['Книга 5', 1000, 2024],
    (err, results, fields) => {
        console.log(results)
}
);

connection.execute(
    'UPDATE `book` SET price = ?',
    [5000],
    (err, results, fields) => {
        console.log(results)
    }
);

connection.execute(
    'DELETE FROM `book` WHERE idbook = 4',

    (err, results, fields) => {
        console.log(results)
    }
);


connection.end()