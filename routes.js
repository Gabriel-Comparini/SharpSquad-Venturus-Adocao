import {Animal, Doacao, PedidoAdocao, Questionario, Usuario} from './models/Modelos.js';
import { create, findAll, findById, verificationNull, patch, deleteById, findUserByEmail, isAdm, getAnythingByUserId } from './services/acessServices.js'
import bcrypt from 'bcrypt';
import { Pix } from 'faz-um-pix';

/*FUNÇÕES GET*/
export async function getAnimal(req, res) {
    try {
        return res.status(200).send(await findAll(Animal));
    } catch (error) {
        console.error('Erro ao buscar animais: ', error);
        return res.status(500).send({"erro": "Erro ao buscar animais"});
    }
}

export async function getUsuarios(req, res) {
    try {
        const user = await findById(Usuario, req.params.id);
        const questionario = await getAnythingByUserId(Questionario, req.params.id, true);

        if (!user) {
            return res.status(404).send({"erro": "Tutor não encontrado"});
        }

        user.dataValues.questionario = questionario;

        return res.status(200).send(user);
    } catch (error) {
        console.error('Erro ao acessar usuários: ', error);
        return res.status(500).send({"erro": "Erro ao buscar dados do tutor"});
    }
}

export async function getAdmAnimais(req, res) {
    try {
        const { id } = req.query;
        const administrador = await isAdm(Usuario, id);
        if (!administrador) return res.status(403).send({"error": "Você está autenticado, mas não tem permissão para acessar este recurso."});
        const animais = await findAll(Animal);
        const numeroAnimais = animais.length;
        return res.status(200).send({"data": animais, "total": numeroAnimais});
    } catch (error) {
        console.error('Erro ao buscar animais: ', error);
        return res.status(500).send({"erro": "Erro ao buscar animais"});
    }
}

export async function getAnimaisById(req, res) { // é uma rota admin também
    try {
        const { id } = req.query;
        const administrador = await isAdm(Usuario, id);
        if (!administrador) return res.status(403).send({"error": "Você está autenticado, mas não tem permissão para acessar este recurso."});
        
        const animal = await findById(Animal, req.params.id);

        const pedidos = await findAll(PedidoAdocao, { where: { animalId: req.params.id }});

        let pedidosId = [];

        for(let i = 0; i < pedidos.length; i++){
            pedidosId[i] = pedidos[i].id;
        }

        animal.dataValues.pedidos = pedidosId;

        if(!animal) {
            return res.status(404).send({"erro": "Animal não encontrado"});
        }

        return res.status(200).send(animal);
    } catch (error) {
        console.error('Erro ao consultar animal: ', error);
        return res.status(500).send({"erro": "Erro ao buscar dados do animal"});
    }
}

/*-----------------------------*/
/* FUNÇÕES POST */

export async function postAnimal(req, res) {
    try {
        if (!req.body || verificationNull(req, "POST") == false) {
            return res.status(400).send({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."})
        }
        return res.status(201).json(await create(Animal, req.body));
    } catch (error) {
        console.error('Erro ao criar animal: ', error);
        return res.status(500).send({"erro": "Erro interno ao cadastrar o animal."});
    }
}

export async function postUsuarios(req, res) {
    try {
        req.body.senha = await bcrypt.hash(req.body.senha, 10);
        if (!req.body || verificationNull(req, "POST") == false) {
            return res.status(400).send({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."})
        }

        const { email } = req.body;
        const anyOtherUser = await findUserByEmail(Usuario, email);

        if(anyOtherUser){
            return res.status(400).send({"erro": "Email preenchido já está sendo utilizado."});
        }

        return res.status(201).send(await create(Usuario, req.body));
    } catch (error) {
        console.error('Erro ao cadastrar o usuário: ', error);
        return res.status(500).send({"erro": "Erro interno ao cadastrar o tutor."});

    }
}

export async function postQuestionario(req, res) {
    try {
        if (!req.body || verificationNull(req, "POST") == false) {
            return res.status(400).send({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
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
            return res.status(400).send({"erro": "O tutor ainda não respondeu o questionário obrigatório"});
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
                return res.status(409).send({"erro": "Este tutor já tem um pedido de adoção para este animal"});
            }
        }
        
        const tutor_questionario = await getAnythingByUserId(Questionario, tutorId);
        
        if(!tutor_questionario){
            return res.status(400).send({"erro": "O tutor ainda não respondeu o questionário obrigatório"});
        }

        const animal = await findById(Animal, animalId);
        const tutor = await findById(Usuario, tutorId);

        if(!tutor || !animal){
            return res.status(404).send({"erro": "Tutor ou animal não encontrado"});
        }

        return res.status(201).send(await create(PedidoAdocao, req.body));
    } catch (error) {
        console.error('Erro ao registrar pedido de adoção: ', error);
        return res.status(500).send({"erro": "Erro ao registrar o pedido de adoção"});
    }
}

export async function postLogin(req, res) {
    try {      
        const user = await findUserByEmail(Usuario, req.body.email);
        
        if(!user){
            return res.status(404).send({"erro": "Usuário não encontrado"});
        }

        if(user.email != req.body.email || (await bcrypt.compare(req.body.senha, user.senha) === false)){
            return res.status(401).send({"erro": "Email ou senha inválidos."});
        }

        return res.status(200).send(`Login bem-sucedido!`);
    
    } catch (error) {
        console.error('Erro ao tentar realizar o login: ', error);
        return res.status(500).send({"erro": "Erro interno ao tentar fazer o login."});
    }
}

export async function postDoacoes(req, res) {
    try {
        if (!req.body || verificationNull(req, "POST", "valor") == false) {
            return res.status(400).send({"erro": "Valor da doação é obrigatório e deve ser um número positivo"});
        }

        const pix = await Pix(req.body.email, req.body.nome, '', req.body.valor, '');
        req.body.linkPix = pix;

        // ==================================================================================================
        // Se der ruim, apaga aqui!
        const imgPix = await Pix(req.body.email, req.body.nome, '', req.body.valor, '', true);
        req.body.qrcode = imgPix;
        // ==================================================================================================

        return res.status(201).send(await create(Doacao, req.body)); 
    } catch (error) {
        console.error('Erro ao tentar processar a doação: ', error);
        return res.status(500).send({"erro": "Erro ao processar a doação"});
    }
}
/*-------------------------------------------------------*/
/*FUNÇÕES PATCH*/
export async function patchUsuarios(req, res) {
    try {
        if (!req.body || verificationNull(req, "PATCH") == true) {
            return res.status(400).send({"erro": "Pelo menos um campo deve ser enviado para atualização"});
        }

        const tutor = await findById(Usuario, req.params.id);

        if(!tutor){
            return res.status(404).send({"erro": "Tutor ou animal não encontrado"});
        }

        if(tutor.administrador !== req.body.administrador) {
            
        }

        return res.status(200).send(await patch(Usuario, req.params.id, req.body));
    } catch (error) {
        console.error('Erro ao tentar atualizar dados do usuário: ', error);
        return res.status(500).send({"erro": "Erro ao atualizar os dados do tutor"});
    }
}

export async function patchAdmAnimais(req, res) {
    try {
        const { id } = req.query;
        const administrador = await isAdm(Usuario, id);
        const animal = await findById(Animal, req.params.id);

        if (!req.body || verificationNull(req, "PATCH") == true) {
            return res.status(400).send({"erro": "Nenhum campo foi fornecido para atualização"});
        }

        if(!animal) {
            return res.status(404).send({"erro": "Animal não encontrado"});
        }

        if(administrador === true){
            return res.status(200).send(await patch(Animal, req.params.id, req.body));
        }
    } catch (error) {
        console.error('Erro ao tentar atualizar dados do animal: ', error);
        return res.status(500).send({"erro": "Erro ao atualizar o animal"});
    }
}

/*--------------------------------------------------------------*/
/*FUNÇÕES DELETE*/

export async function deleteAdmAnimais(req, res) {
    try {
        const { id } = req.query;
        const administrador = await isAdm(Usuario, id);
        const animal = await findById(Animal, req.params.id);

        if(!animal) {
            return res.status(404).send({"erro": "Animal não encontrado"});
        }

        if(administrador === true) {
            return res.status(204).send(await deleteById(Animal, req.params.id));
        } else {
            return res.status(403).send({"erro": "Acesso não autorizado"});
        }
    } catch (error) {
        console.error('Erro ao tentar deletar animal: ', error);
        return res.status(500).send({"erro": "Erro ao remover animal"});
    }
}
/*--------------------------------------------------------------*/