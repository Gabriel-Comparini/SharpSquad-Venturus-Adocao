import {Animal, Doacao, PedidoAdocao, Questionario, Usuario} from './models/Modelos.js';
import { create, findAll, findById, verificationNull, patch, deleteById, findUserByEmail, isAdm, getAnythingByUserId } from './services/acessServices.js'
import bcrypt from 'bcrypt';

/*FUNÇÕES GET*/
export async function getAnimal(req, res) {
    try {
        return res.status(200).send(await findAll(Animal));
    } catch (error) {
        return res.status(500).send("Erro ao consultar animais");
    }
}

export async function getUsuarios(req, res) {
    try {
        const user = await findById(Usuario, req.params.id);
        const questionario = await getAnythingByUserId(Questionario, req.params.id, true);

        user.dataValues.questionario = questionario

        return res.status(200).send(user);
    } catch (error) {
        console.error('Deu erro na rota getUsuarios: ', error);
        return res.status(500).send("Erro ao buscar dados do usuário");
    }
}

export async function getAdmAnimais(req, res) {
    try {
        const { id } = req.query;
        const administrador = await isAdm(Usuario, id);
        if (!administrador) return res.status(403).send({
            "error": "Você está autenticado, mas não tem permissão para acessar este recurso."
        });
        const animais = await findAll(Animal);
        const numeroAnimais = animais.length;
        return res.status(200).send({"data": animais, "total": numeroAnimais});
    } catch (error) {
        console.error('Deu erro na rota getAdmAnimais: ', error);
        return res.status(500).send("Erro ao buscar animais");
    }
}

export async function getAnimaisById(req, res) {
    try {
        return res.status(200).send(await findById(Animal, req.params.id));
    } catch (error) {
        return res.status(500).send("Erro ao consultar animal");
    }
}

/*-----------------------------*/
/* FUNÇÕES POST */

export async function postAnimal(req, res) {
    try {
        if (!req.body || verificationNull(req, "POST") == false) {
            return res.status(400).send(`Erro: Todos os campos obrigatórios devem ser preenchidos corretamente.`)
        }
        return res.status(201).json(await create(Animal, req.body));
    } catch (error) {
        return res.status(500).send(`Erro ao criar animal`);
    }
}

export async function postUsuarios(req, res) {
    try {
        req.body.senha = await bcrypt.hash(req.body.senha, 10);
        if (!req.body || verificationNull(req, "POST") == false) {
            return res.status(400).send(`Erro: Todos os campos obrigatórios devem ser preenchidos corretamente.`)
        }

        const { email } = req.body;
        const anyOtherUser = await findUserByEmail(Usuario, email);

        if(anyOtherUser){
            return res.status(400).send("Email preenchido já está sendo utilizado");
        }

        return res.status(201).send(await create(Usuario, req.body));
    } catch (error) {
        console.error('Deu erro na rota postUsuarios: ', error);
        return res.status(500).send({"erro": "Erro interno ao cadastrar o tutor."});

    }
}

export async function postQuestionario(req, res) {
    try {
        if (!req.body || verificationNull(req, "POST") == false) {
            return res.status(400).send(`Erro: Todos os campos obrigatórios devem ser preenchidos corretamente.`)
        }
        
        const questionarioExistente = await getAnythingByUserId(Questionario, req.body.tutorId, true);
        if(questionarioExistente){
            return res.status(409).send("Questionário já preenchido para este tutor");
        }

        return res.status(201).json(await create(Questionario, req.body));
    } catch (error) {
        console.error('Deu erro na rota postQuestionario: ', error);
        return res.status(500).send("Erro ao buscar dados do tutor");
    }
}

export async function postAdocoes(req, res) {
    try {
        if (!req.body || verificationNull(req, "POST") == false) {
            return res.status(400).send(`Erro: Todos os campos obrigatórios devem ser preenchidos corretamente.`)
        }

        const { tutorId, animalId } = req.body;
        const pedidosAnteriores = await getAnythingByUserId(PedidoAdocao, tutorId);

        let numeroDePedidosIguais = 0;
        if(pedidosAnteriores && pedidosAnteriores.length >= 1){
            for(let i = 0; i < pedidosAnteriores.length; i++){
                if(pedidosAnteriores[i].animalId === animalId){
                    numeroDePedidosIguais++;
                }
            }
            if(numeroDePedidosIguais >= 1){
                return res.status(409).send("Este tutor já tem um pedido de adoção para este animal");
            }
  
        }
        
        const tutor_questionario = await getAnythingByUserId(Questionario, tutorId);
        
        if(!tutor_questionario){
            return res.status(400).send("O tutor ainda não respondeu o questionário obrigatório");
        }

        const animal = await findById(Animal, animalId);
        const tutor = await findById(Usuario, tutorId);

        if(!tutor || !animal){
            return res.status(400).send("Tutor ou animal não encontrado");
        }


        return res.status(201).send(await create(PedidoAdocao, req.body));
    } catch (error) {
        console.error('Deu erro na rota postAdocoes: ', error);
        return res.status(500).send("Erro ao registrar pedido de adoção");
    }
}

export async function postLogin(req, res) {
    try {      
        // const { email, senha } = req.body;
        // const hashedPassword  = await bcrypt.hash(senha, 10);
        // return res.status(201).send(await getAdm(Usuario, hashedPassword, email));
        const user = await findUserByEmail(Usuario, req.body.email);
        
        if(!user){
            return res.status(404).send("Usuário não encontrado");
        }

        if(user.email != req.body.email || (await bcrypt.compare(req.body.senha, user.senha) === false)){
            return res.status(401).send("Email ou senha inválidos");
        }

        return res.status(201).send(`Login bem sucedido!`);
    
    } catch (error) {
        console.error('Deu erro na rota postLogin: ', error);
        return res.status(500).send("Erro interno ao tentar fazer o login");
    }
}

export async function postDoacoes(req, res) {
    try {
        if (!req.body || verificationNull(req, "POST", "valor") == false) {
            return res.status(400).send(`Erro: Valor da doação é obrigatório e deve ser um número positivo.`)
        }
        return res.status(201).send(await create(Doacao, req.body)); 
    } catch (error) {
        console.error('Deu erro na rota postDoacoes: ', error);
        return res.status(500).send("Erro ao processar a doação");
    }
}
/*-------------------------------------------------------*/
/*FUNÇÕES PATCH*/
export async function patchUsuarios(req, res) {
    try {
        if (!req.body || verificationNull(req, "PATCH") == true) {
            return res.status(400).send(`Erro: Pelo menos um campo deve ser enviado para atualização.`)
        }
        return res.status(200).send(await patch(Usuario, req.params.id, req.body));
    } catch (error) {
        console.error('Deu erro na rota patchUsuarios: ', error);
        return res.status(500).send("Erro ao atualizar usuário");
    }
}

export async function patchAdmAnimais(req, res) {
    try {
        const { id } = req.query;
        const administrador = await isAdm(Usuario, id);

        if (!req.body || verificationNull(req, "PATCH") == true) {
            return res.status(400).send(`Erro: Pelo menos um campo deve ser enviado para atualização.`)
        }
        if(administrador === true){
            return res.status(200).send(await patch(Animal, req.params.id, req.body));
        }
    } catch (error) {
        console.error('Deu erro na rota patchAdmAnimais: ', error);
        return res.status(500).send("Erro ao atualizar animal");
    }
}

/*--------------------------------------------------------------*/
/*FUNÇÕES DELETE*/

export async function deleteAdmAnimais(req, res) {
    try {
        const { id } = req.query;
        const administrador = await isAdm(Usuario, id);

        if(administrador === true) {
            return res.status(204).send(await deleteById(Animal, req.params.id));
        }
        else{
            return res.status(403).send("Acesso não autorizado");
        }
    } catch (error) {
        console.error('Deu erro na rota deleteAdmAnimais: ', error);
        return res.status(500).send("Erro ao deletar animal");
    }
}
/*--------------------------------------------------------------*/