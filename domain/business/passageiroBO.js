'use strict';
const PassageiroRepo = require('../repository/passageiroRepository');
const passageiroRepo = new PassageiroRepo();

/** Adiciona Passageiro. */
exports.addPassageiro = async function(body) {
    
    let _pass = await passageiroRepo.getPassageiroByCard(body.cardId);
    let _pass2 = await passageiroRepo.getPassageiroByEmail(body.email);

    if(_pass[0] || _pass2[0]){
        var err = new Error('Usuário já cadastrado para esse card ou e-mail');
        throw err;
    }

    if(!(body.name && body.email && body.cardId && body.password)){
        var err = new Error('Campos insuficientes');
        throw err;
    }

    let validObj = { nome: null, email: null, cardID: null, senha: null };
  
    validObj.nome = body.name;
    validObj.email = body.email;
    validObj.cardID = body.cardId;
    validObj.senha = body.password;

    let result = await passageiroRepo.adicionar(validObj);
    return result;
    
}

