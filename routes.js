import {Animal, Doacao, PedidoAdocao, Questionario} from './models/Modelos.js';
import {create, findAll, findById} from './services/animalServices.js'

export async function getAnimal(req, res) {
    try {
        return res.status(201).send(await findAll(Animal));
    } catch (error) {
        return res.status(500).send("Erro ao consultar animais");
    }
}

export async function postAnimal(req, res) {
    try {
        
        return res.status(201).json(await create(Animal, req.body));
    } catch (error) {
        return res.status(500).send(`Erro ao criar animal ${error}`);
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
    try {
        return res.status(200).send(await findById(Animal, req.params.id));
    } catch (error) {
        res.status(500).send("Erro ao consultar animal");
    }
}

export async function postLogin(req, res) {
    
}

export async function postDoacoes(req, res) {
    
}