import express from 'express';
import bodyParser from 'body-parser';
import { deleteAdmAnimais, getAdmAnimais, getAnimal, patchAdmAnimais, postAdocoes, postAnimal, postDoacoes, postLogin, postQuestionario, postTutores, getAnimaisById } from './routes.js';
import sequelize from './models/Modelos.js';

export const app = express();
app.use(express.json());
const port = 3000;
const host = 'localhost';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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

app.post('/tutores/:id', (req, res) => {
    postTutores(req, res);
});

app.get('/tutores/:id', (req, res) => {
    postTutores(req, res);
});

app.post('/questionario', (req, res) => {
    postQuestionario(req, res);
});

app.post('/adocoes', (req, res) => {
    postAdocoes(req, res);
});

app.get('/admin/animais', (req, res) => {
    getAdmAnimais(req, res);
});

app.patch('/admin/animais/:id', (req, res) => {
    patchAdmAnimais(req, res);
});

app.delete('/admin/animais/:id', (req, res) => {
    deleteAdmAnimais(req, res);
});

app.get('/animais/:id', (req, res) => {
    getAnimaisById(req, res);
});

app.post('/login', (req, res) => {
    postLogin(req, res);
});

app.post('/doacoes', (req, res) => {
    postDoacoes(req, res);
    postAnimal(req, res);
});

app.listen(port, (err) => {
    if (err) return console.error('Deu erro aí: ',err);

    console.log(`Servidor rodando em http://${host}:${port}/`);
});