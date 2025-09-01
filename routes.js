import { createAnimal, findAllAnimals } from "./services/animalServices";

export async function getAnimal(req, res) {
    try {
        return res.status(201).send(await findAllAnimals());
    } catch (error) {
        return res.status(500).send("Erro ao consultar animais");
    }
}

export async function postAnimal(req, res) {
    try {
        createAnimal(req.body);
        return res.status(201).json(req.body);
    } catch (error) {
        return res.status(500).send("Erro ao criar animal");
    }
}

export async function postTutores(req, res) {
    
}

export async function patchTutores(req, res) {
    
}

export async function getTutores(req, res) {
    
}

export async function postQuestionario(req, res) {
    
}

export async function postAdocoes(req, res) {
    
}

export async function getAdmAnimais(req, res) {
    
}

export async function patchAdmAnimais(req, res) {
    
}

export async function deleteAdmAnimais(req, res) {
    
}

export async function getAnimaisById(req, res) {
    
}

export async function postLogin(req, res) {
    
}

export async function postDoacoes(req, res) {
    
}