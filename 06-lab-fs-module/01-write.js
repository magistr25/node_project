import {writeFile} from 'fs/promises'

// до 13 версии: import {writeFile} from 'node:fs/promises'

const data = 'Ехал грека через реку, \r\nвидит грека в реке - рак.'
const promise = writeFile('message.txt', data);
await promise