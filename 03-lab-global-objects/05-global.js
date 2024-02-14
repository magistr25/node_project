//console.log(global);

// setTimeout(() => {
//     global.console.log('прошла секунда');
// }, 1000)
//
// setTimeout(() => {
//     console.log('прошло две секунды');
// }, 2000)


let count = 1;

function printNumber() {
    console.log(count);
    count++;

    if (count <= 10) {
        setTimeout(printNumber, 1000);
    }
}

// Запускаем вывод чисел с интервалом 1 секунда
printNumber();


// let count2=1
//
// const printNumber_2 = setInterval(() => {
//     console.log(count2);
//     count2++;
//
//     if (count2 > 10) {
//         clearInterval(printNumber_2); // Останавливаем интервал после вывода чисел от 1 до 10
//     }
// }, 1000);
