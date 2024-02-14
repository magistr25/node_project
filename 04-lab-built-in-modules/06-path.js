import path from 'node:path'

console.log(path.basename('C:\\temp\\myfile.html')); //myfile.html
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html')); //quux

console.log(path.extname('index.js')); // .js

let p1 = path.format({
    root: '/ignored',
    dir: '/home/user/dir',
    base: 'file.txt',
});
console.log(p1)
console.log(path.parse('/home/user/dir/file.txt'))