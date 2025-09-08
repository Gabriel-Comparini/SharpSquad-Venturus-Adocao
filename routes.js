import {Animal, Doacao, PedidoAdocao, Questionario, Tutor} from './models/Modelos.js';
import {create, findAll, findById} from './services/acessServices.js'

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
    try {
        return res.status(201).send(await create(Tutor, req.body));
    } catch (error) {
        console.error('Deu erro na rota postTutores: ', error);
        return res.status(500).send({"erro": "Erro interno ao cadastrar o tutor."});
    }
}

export async function patchTutores(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota patchTutores: ', error);
    }
}

export async function getTutores(req, res) {
    try {

    } catch (error) {
        console.error('Deu erro na rota getTutores: ', error);
    }
}

export async function postQuestionario(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota postQuestionario: ', error);
    }
}

export async function postAdocoes(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota postAdocoes: ', error);
    }
}

export async function getAdmAnimais(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota getAdmAnimais: ', error);
    }
}

export async function patchAdmAnimais(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota patchAdmAnimais: ', error);
    }
}

export async function deleteAdmAnimais(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota deleteAdmAnimais: ', error);
    }
}

export async function getAnimaisById(req, res) {
    try {
        return res.status(200).send(await findById(Animal, req.params.id));
    } catch (error) {
        res.status(500).send("Erro ao consultar animal");
    }
}

export async function postLogin(req, res) {
    try {
        return res.status(201).send();
    } catch (error) {
        console.error('Deu erro na rota postLogin: ', error);
    }
}

export async function postDoacoes(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota postDoacoes: ', error);
    }
}