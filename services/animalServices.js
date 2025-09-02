import {Animal} from '../models/Modelos.js';

export async function findAllAnimals(){
    return await Animal.findAll();
}

export async function findAnimalById(id){
    return await Animal.findByPk(id);
}

export async function createAnimal(body){
    try {
        ({id, nome, especie, porte, castrado, vacinado, descricao} = body);
        return await Animal.create({
            "id": id,
            "nome": nome,
            "especie": especie,
            "porte":  porte,
            "castrado": castrado,
            "vacinado": vacinado,
            "descricao":descricao
        });
    } catch (error) {
        console.error('Erro ao criar o animal:', error);
        throw error;
    }
}