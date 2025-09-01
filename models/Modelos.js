import { Sequelize } from 'sequelize';
import sqlite from 'sqlite3'
import AnimalModel from './Animal.js';
import TutorModel from './Usuario.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';

const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database('database.db');

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db',
});

export const Animal = AnimalModel(sequelize);
export const Tutor = TutorModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

// Associações
// Explicação das associações:
// - Um Tutor tem um Questionario.
// - Um Tutor pode ter vários Pedidos de Adoção.
// - Um Animal pode ter vários Pedidos de Adoção.
// A tabela PedidosAdocao serve como uma tabela de junção entre Tutores e Animais.

await sequelize.sync();

export default { sequelize, Animal, Tutor, Questionario, PedidoAdocao, Doacao };
//export default { sequelize, Animal, Questionario, PedidoAdocao, Doacao };
