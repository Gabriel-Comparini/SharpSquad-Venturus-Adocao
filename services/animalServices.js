import Animal from './models/Animal.js';

export async function getAllAnimals(){
    return Animal.findAll();
}

export async function getAnimalById(id){
    return Animal.findByPk(id);
}

export async function postAnimal(body){
    Animal.Create(body);
}