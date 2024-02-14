const { createHmac } = await import('node:crypto');

const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update('Я люблю пирожки !!!')
               .digest('hex');
               
console.log(hash);