const {readFile} = require('fs');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, repsonse) => {
    readFile('./index.html', 'utf-8', (err, html) => {
        if (err) {
            response.status(500).send('sorry, out of order')
        }
        repsonse.send(html)
    });
});

app.listen(process.env.PORT || 3000, () => console.log(`App avaiable on http://localhost:3000`));