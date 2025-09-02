import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './models/Modelos.js';
import { getAnimaisById, getAnimal, postAnimal } from './routes.js';

export const app = express();
app.use(express.json());
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

app.get("/animais", (req, res) => {
    getAnimal(req, res);
});

app.get("/animais/:id", (req, res) => {
    getAnimaisById(req, res);
});

app.post('/animais', (req, res) => {
    postAnimal(req, res);
});

app.listen(port, (err) => {
    if (err) return console.error('Deu erro aí: ',err);

    console.log(`Servidor rodando em http://${host}:${port}/`);
});