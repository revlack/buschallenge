'use strict';
const LancamentoRepo = require('../repository/lancamentoRepository');
const lancamentoRepo = new LancamentoRepo();
const PassageiroRepo = require('../repository/passageiroRepository');
const passageiroRepo = new PassageiroRepo();
const LinhaRepo = require('../repository/linhaRepository');
const linhaRepo = new LinhaRepo();
const data = require('../utils/data');

/** Adiciona Débito. */
exports.addDebito = async function(body) {

    let passageiro = await passageiroRepo.getPassageiroByCard(body.cardId);    

    // Validação primaria
    if(!passageiro){
        var err = new Error('Requisição inválida');
        throw err;
    }

    if(!(body.cardId && body.code && body.value)){
        var err = new Error('Campos insuficientes');
        throw err;
    }

    if (typeof body.value != "number") {
        var err = new Error('Valor para value inválido');
        throw err;          
    }
    
    let saldo = await lancamentoRepo.getSaldoByCodigoPassageiro(passageiro.codigoPassageiro);
    let linha  = await linhaRepo.getLinhaByCode(body.code);


    // Validação Secundária
    if(saldo < body.value) {
        var err = new Error('Saldo insuficiente');
        throw err;  
    }

    if(!linha) {
        var err = new Error('Linha não encontrada');
        throw err;  
    }
    
    let validObj = { codigoPassageiro: null, codigoLinha: null, codigoUnidade: null, valor: null };

    validObj.codigoPassageiro = passageiro.codigoPassageiro;
    validObj.codigoLinha = linha.codigoLinha;
    validObj.valor = (body.value) * -1;
    
    let result = await lancamentoRepo.salvaLancamento(validObj);
    return result;
    
}


exports.getLancamentosDebitos = async function(parametros) {          
   
        let _dataInico = undefined;
        let _dataFim = undefined;

        if(parametros.initialDate.value){
            _dataInico = data.parseDateForUs(parametros.initialDate.value);
        }
        if(parametros.finalDate.value){
            _dataFim = data.parseDateForUs(parametros.finalDate.value);
        }
   
        let result = await  lancamentoRepo.getLancamentosDebitos(_dataInico, _dataFim ,parametros.cardId.value);    
        return result;
}
    
    