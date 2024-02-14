console.log(Buffer.from([1, 2, 3]))
console.log(Buffer.from('test'))
console.log(Buffer.from('тест'))
console.log(Buffer.from('тест').toString())

{/* <Buffer 01 02 03>
<Buffer 74 65 73 74>
<Buffer d1 82 d0 b5 d1 81 d1 82>
тест */}