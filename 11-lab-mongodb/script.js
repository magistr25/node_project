import {MongoClient} from 'mongodb'

//URL соединеня
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

//Название базы данных
const dbName = 'mydb';

async function main() {
    await client.connect();
    console.log('подключились к серверу');
    const db = client.db(dbName);
    const collection = db.collection('book')

    //теперь нужный код вставляем тут


    // Вставка нескольких документов в коллекцию MongoDB
    const insertResult = await collection.insertMany([
        {title: 'Книга10', price: 10},
        {title: 'Книга20', price: 20},
        {title: 'Книга30', price: 30}
    ])
    console.log(insertResult)


    // Обновление одного документа. Критерий: price <100. Результат: значение price= price+500.
    const updateResult = await collection.updateOne(
        {price: {$lt:100}},
        {$inc:{price: +500}}
        )
    console.log(updateResult)

    //фильтрация
    const filtereDocs = await collection.find({price: {$gt: 1000}}).toArray();
    console.log('Книг дороже 1000 руб найдено =>', filtereDocs);

    return 'готово.';

}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());