import Doacoes from './models/Doacoes.js';

export async function findAllDoacoess(){
    return Doacoes.findAll();
}

export async function findDoacoesById(id){
    return Doacoes.findByPk(id);
}

export async function createDoacoes(body){
    Doacoes.Create(body);
}