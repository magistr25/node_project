console.clear();
// console.log(process)

console.log(''); 
console.log('*'.repeat(50)); 
console.log('версия Nodejs:',process.version)
console.log('архитектура:',process.arch)
console.log('платформа:',process.platform)

console.log(''); 
console.log('данные:',process.env.ALLUSERSPROFILE);
console.log('данные программы:',process.env.APPDATA); 
console.log('имя компьютера:',process.env.COMPUTERNAME); 
console.log('путь к консоли:',process.env.ComSpec); 
console.log('драйвера:',process.env.HOMEDRIVE); 
console.log('операционная система:',process.env.OS); 
console.log('имя пользователя:',process.env.USERNAME); 
console.log('язык:',process.env.LANG); 

console.log(''); 
console.log('аргументы доступные скрипту ', JSON.stringify(process.argv, null, '  '));
if (process.mainModule) {
    console.log('пути поиска модулей ', JSON.stringify(process.mainModule.paths, null, '  '));
} else {
    console.log('process.mainModule не определен');
}

console.log(''); 
console.log('stdout', process.stdout.toString() ); 
console.log('stdin', process.stdin.toString()); 
console.log('stderr', process.stderr.toString()); 
console.log('nextTick', process.nextTick);
console.log('Before nextTick');

process.nextTick(() => {
    console.log('Inside nextTick');
});

console.log('After nextTick');

// Просто для поддержания процесса выполнения, чтобы видеть результат
setInterval(() => {}, 1000);
