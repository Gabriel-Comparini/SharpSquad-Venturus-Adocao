import { Sequelize, where } from "sequelize";
import { sequelize } from "../models/Modelos.js";

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
        return await model.findByPk({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error('Erro ao procurar por id: ', error);
        throw error;
    }
}

export async function create(model, body){
    try {
        console.log(body);
        return await model.create(body);
    } catch (error) {
        console.error('Erro ao criar:', error);
        throw error;
    }
}

export async function patch(model, id, body) { // consertar
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