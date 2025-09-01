import Questionario from './models/Questionario.js';

export async function findAllQuestionarios(){
    return Questionario.findAll();
}

export async function findQuestionarioById(id){
    return Questionario.findByPk(id);
}

export async function createQuestionario(body){
    Questionario.Create(body);
}