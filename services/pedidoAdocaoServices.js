import pedidoAdocao from './models/PedidoAdocao.js';

export async function findAllpedidoAdocaos(){
    return pedidoAdocao.findAll();
}

export async function findpedidoAdocaoById(id){
    return pedidoAdocao.findByPk(id);
}

export async function createpedidoAdocao(body){
    pedidoAdocao.create(body);
}