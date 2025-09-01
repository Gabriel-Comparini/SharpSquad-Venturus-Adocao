import Usuario from './models/Usuario.js';

//get tutores
export async function findUserById(id){
    return Usuario.findByPk(id);
}

//patch tutores
export async function updateUserById(id, body) {
    
}

//post tutores
export async function createUser(body) {
    Usuario.Create(body)
}