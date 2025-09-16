import { Sequelize, where } from "sequelize";

export async function findAll(model){
    try {
        return await model.findAll();
    } catch (error) {
        console.error('Erro ao procurar todos: ', error);
        throw error;
    }
}

export async function findById(model, id){
    try {
        return await model.findByPk(id);
    } catch (error) {
        console.error('Erro ao procurar por id: ', error);
        throw error;
    }
}

export async function create(model, body) {
    try {
        console.log(body);
        return await model.create(body);
    } catch (error) {
        console.error('Erro ao criar:', error);
        throw error;
    }
}

export async function patch(model, id, body) {
    try {
        return await model.update(body, {
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        throw error;
    }
}

export async function deleteById(model, id) {
    try {
        return await model.destroy({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        throw error;
    }
}

export function verificationNull(req) {
    let empty = false;
    // Padrão de retorno falso
    const keys = Object.keys(req.body);


    for (let i = 0; i < keys.length; i++) {
        // req.body[keys[i]] representa o valor da chave, no índice específico, do corpo da requisição
        const value = req.body[keys[i]];
        // Aqui, value é o valor em si, enquanto que keys[i] remete ao nome do campo.
        if ((value === undefined || value === null || value === "") && keys[i].toLowerCase() !== "foto") {
            empty = true;
        }
    }
    return empty;
}