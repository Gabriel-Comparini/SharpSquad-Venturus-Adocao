import Doacoes from './models/Doacoes.js';

/* apagar comentario que so serve pra commitar na main */
export async function findAllDoacoess(){
    return Doacoes.findAll();
}

export async function findDoacoesById(id){
    return Doacoes.findByPk(id);
}

export async function createDoacoes(body){
    Doacoes.create(body);
}