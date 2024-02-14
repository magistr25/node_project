import MyMath, { sum, sub, mul, div } from "./MyMath.js";
import isOdd from 'is-odd';
import cowsay from 'cowsay';
import Fibonacci from "./Fibonacci.js";

console.log(sum(10, 3));
console.log(sub(10, 3));
console.log(mul(10, 3));
console.log(div(10, 3));

console.log(MyMath.sum(10, 3));
console.log(MyMath.sub(10, 3));
console.log(MyMath.mul(10, 3));
console.log(MyMath.div(10, 3));

console.log(isOdd('1'));
console.log(isOdd('3'));
console.log(isOdd('0'));
console.log(isOdd('2'));


console.log(cowsay.say({
    text: 'Я пример модуля!'
}));

console.log(Fibonacci(23))

// Алексей, в файле с лабой "05-lab" в 10 задании, я правильно поняла,
// что там специально опечатка и надо написать: isOdd from 'is-odd' - по системе ES-6?
