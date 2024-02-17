import {stat} from 'fs/promises'

try{
    const path = new URL ('newMessage.txt', import.meta.url)
    const result = await stat(path)

    console.log(JSON.stringify(result, null, ' '))
}
catch (e){
    console.error(e)
}