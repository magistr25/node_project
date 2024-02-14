import {EventEmitter} from  'node:events';

class MyEmitter extends EventEmitter {}

const  myEmitter = new MyEmitter();

myEmitter.on('event', (data) => {
    console.log('Событие произошло!!!', data)
});

myEmitter.emit('event', true);