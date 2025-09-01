import { loginServices } from "./services/loginServices"

export async function getAnimal(req, res) {

}

export async function postAnimal(req, res) {
    
}

export async function postTutores(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota postTutores: ', error)
    }
}

export async function patchTutores(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota patchTutores: ', error)
    }
}

export async function getTutores(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota getTutores: ', error)
    }
}

export async function postQuestionario(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota postQuestionario: ', error)
    }
}

export async function postAdocoes(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota postAdocoes: ', error)
    }
}

export async function getAdmAnimais(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota getAdmAnimais: ', error)
    }
}

export async function patchAdmAnimais(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota patchAdmAnimais: ', error)
    }
}

export async function deleteAdmAnimais(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota deleteAdmAnimais: ', error)
    }
}

export async function getAnimaisById(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota getAnimaisById: ', error)
    }
}

export async function postLogin(req, res) {
    try {
        return res.status(201).send(await loginServices());
    } catch (error) {
        console.error('Deu erro na rota postLogin: ', error)
    }
}

export async function postDoacoes(req, res) {
    try {
        
    } catch (error) {
        console.error('Deu erro na rota postDoacoes: ', error)
    }
}