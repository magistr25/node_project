import {appendFile} from 'fs/promises'

try {
    const filePath = new URL ('message.txt', import.meta.url)
    const data = '\r\nСунул грека руку в реку, \r\nрак за руку греку - цап!'
    await appendFile(filePath,data)
}
catch (e){
    console.error(e.message)
}