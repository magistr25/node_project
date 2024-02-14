import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const answer = await rl.question('Что вы думаете о Node.js? \n');

console.log(`Спасибо за оставленный отзыв: ${answer}`);

rl.close();