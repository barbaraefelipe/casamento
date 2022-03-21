const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

let csv = fs.readFileSync('list.csv', 'utf-8').trim().split('\n').map(line => {
    let parans = line.split(',');
    let name = parans[0];
    let price = parseFloat((parans[1] + '.' + parans[2]).replace('R$ ', '').replace(/\"/g, ''))
    let photo = parans[3];
    return { name, price, photo, buy: false };
});
(async () => {
    for (let i = 0; i < csv.length; i++) {
        const body = csv[i];
        console.log('send', body)
        let req = await fetch(`https://casamento-bf.herokuapp.com/api/gifts?auth=${process.env.KEY}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(await req.json())
    }
})();