import {readFile} from 'node:fs/promises';

try {
    const filePath = new URL('message.txt', import.meta.url);
    console.log(`filePath: ${filePath}`)
    const contents = await readFile(filePath, {encoding: 'utf-8'});
    console.log(contents);

} catch (e) {
    console.error(e.message)
}
