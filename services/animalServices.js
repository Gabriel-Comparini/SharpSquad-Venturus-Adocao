import Animal from './models/Animal.js';

export async function findAllAnimals(){
    return Animal.findAll();
}

export async function findAnimalById(id){
    return Animal.findByPk(id);
}

export async function createAnimal(body){
    Animal.Create(body);
}