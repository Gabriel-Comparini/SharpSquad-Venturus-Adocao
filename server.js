import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './models/Modelos.js';

const app = express();
const port = 3000;
const host = 'localhost';

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Foi!');
    } catch (error) {
        console.error('Não foi!', error);
    }
})();

app.get('/', (req, res) => {
    res.send('<strong>Server ta funfando com sucesso!</strong>');
});

app.post('/usuarios', (req, res) => {
    res.status(201);
});

app.post('/doacoes', (req, res) => {
    res.status(201);
});

app.listen(port, (err) => {
    if (err) return console.error('Deu erro aí: ',err);

    console.log(`Servidor rodando em http://${host}:${port}/`);
});