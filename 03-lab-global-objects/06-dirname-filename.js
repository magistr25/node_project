//CJS
// console.log('')
// console.log('*'.repeat(50))
// console.log(__dirname)
// console.log(__filename)
// console.log('*'.repeat(50))
// console.log('')

//ES6
import { URL } from 'url'; 
const __filename = new URL('', import.meta.url).pathname.slice(1);
const __dirname = new URL('.', import.meta.url).pathname.slice(1);
console.log(__dirname)
console.log(__filename)