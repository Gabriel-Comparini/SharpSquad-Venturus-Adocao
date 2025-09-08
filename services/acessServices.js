export async function findAll(model) {
    return await model.findAll();
}

export async function findById(model, id) {
    return await model.findByPk(id);
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

