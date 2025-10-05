import bcrypt from 'bcrypt';

export async function findAll(model, where){
    try {
        return await model.findAll(where);
    } catch (error) {
        console.error('Erro ao procurar todos: ', error);
        throw error;
    }
}

export async function findById(model, id) {
    try {
        return await model.findByPk(id);
    } catch (error) {
        console.error('Erro ao procurar por id: ', error);
        throw error;
    }
}

export async function create(model, body) {
    try {
        console.log(body);
        return await model.create(body);
    } catch (error) {
        console.error('Erro ao criar:', error);
        throw error;
    }
}

export async function patch(model, id, body) {
    try {
        return await model.update(body, {
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        throw error;
    }
}

export async function deleteById(model, id) {
    try {
        return await model.destroy({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        throw error;
    }
}

export function verificationNull(req, method, extraField = null) {
    if (method == "POST") {
        let notEmpty = true;
        // Padrão de retorno falso
        const keys = Object.keys(req.body);

        if (extraField) {
            const extraValue = req.body[extraField];
            if (extraValue === undefined || extraValue === null || extraValue === "") {
                notEmpty = false;// Já pode retornar false aqui
            }
        }

        for (let i = 0; i < keys.length; i++) {
            // req.body[keys[i]] representa o valor da chave, no índice específico, do corpo da requisição
            const value = req.body[keys[i]];
            // Aqui, value é o valor em si, enquanto que keys[i] remete ao nome do campo.
            if ((value === undefined || value === null || value === "") && keys[i].toLowerCase() !== "foto") {
                notEmpty = false;
                break;
            }
        } 

    return notEmpty;
    }
    else if(method == "PATCH"){
        let semCampos = true;
        const keys = Object.keys(req.body);

        for (let i = 0; i < keys.length; i++) {
            const value = req.body[keys[i]];
            if (value !== undefined && value !== null && value !== "") {
                semCampos = false;
                break;
            }
        }
        return semCampos;
    }
}

export async function isAdm(model, id) {
    try {
        const user = await findById(model, id);
        if (!user) {
            return console.error('Erro ao verificar administrador');
        }

        if (JSON.parse(user.administrador)){
            return true;
        }  else {
            return false;
        }
    } catch (error) {
        console.error("Erro no isAdm: ", error);
    }
}

export async function findUserByEmail(model, email) {
    try {
        return await model.findOne({ where: { email: email } });
    } catch (error) {
        console.error('Erro ao procurar por email: ', error);
        throw error;
    }
}

export async function getAnythingByUserId(model, userId, uniqueSearch = false){
    try {
        if(!uniqueSearch){
            return await model.findAll({ where: { tutorId: userId}});
        }
        else{
            return await model.findOne({ where: { tutorId: userId}});
        }
    } catch (error) {
        return console.error("Erro ao acessar dados do usuário: ", error);
    }
}

export async function startSeed(model){
    try{

        const admins = await model.findAll({ where: { administrador: true}});
        if(admins && admins.length > 0){
            return;
        }

        create(model, {
            nome_completo: "Breno Valentim Bernardo",
            idade: 17,
            email: "emaildobreno",
            senha: await bcrypt.hash("senhadobreno", 10),
            telefone: "telefonedobreno",
            instagram: "instadobreno",
            facebook: "facebookdobreno",
            cidade: "cidadedobreno",
            estado: "estadodobreno",
            administrador: true
        });
        
        create(model, {
            nome_completo: "Fabricio de Araujo Krull",
            idade: 17,
            email: "emaildofabricio",
            senha: await bcrypt.hash("senhadofabricio", 10),
            telefone: "telefonedofabricio",
            instagram: "instadofabricio",
            facebook: "facebookdofabricio",
            cidade: "cidadedofabricio",
            estado: "estadodofabricio",
            administrador: true
        });
        
        create(model, {
            nome_completo: "Gabriel de Carvalho Comparini",
            idade: 17,
            email: "emaildocomparini",
            senha: await bcrypt.hash("senhadocomparini", 10),
            telefone: "telefonedocomparini",
            instagram: "instadocomparini",
            facebook: "facebookdocomparini",
            cidade: "cidadedocomparini",
            estado: "estadodocomparini",
            administrador: true
        });
        
        create(model, {
            nome_completo: "João Pedro Crepaldi Gonçalves",
            idade: 17,
            email: "emaildocrepaldi",
            senha: await bcrypt.hash("senhadocrepaldi", 10),
            telefone: "telefonedocrepaldi",
            instagram: "instadocrepaldi",
            facebook: "facebookdocrepaldi",
            cidade: "cidadedocrepaldi",
            estado: "estadodocrepaldi",
            administrador: true
        });
    }
    catch(error){
        console.error("Erro ao iniciar seed: ", error);
    }

}

export async function devGetAll(model){
    return console.log(await findAll(model));
}