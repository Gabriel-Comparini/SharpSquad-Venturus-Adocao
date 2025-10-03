import { Sequelize } from 'sequelize';
import AnimalModel from './Animal.js';
import UsuarioModel from './Usuario.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';
import dotenv from 'dotenv';

// dotenv.config();

// export const sequelize = new Sequelize({
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: process.env.DB_DIALECT,
//     logging: Boolean(process.env.DB_LOGIN)
// });
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

export const Animal = AnimalModel(sequelize);
export const Usuario = UsuarioModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

// Associações
// Explicação das associações:
// - Um Usuario tem um Questionario.
// - Um Usuario pode ter vários Pedidos de Adoção.
// - Um Animal pode ter vários Pedidos de Adoção.
// A tabela PedidosAdocao serve como uma tabela de junção entre Usuarios e Animais.

await sequelize.sync();

export default { sequelize, Animal, Usuario, Questionario, PedidoAdocao, Doacao };
