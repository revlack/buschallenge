'use strict';

const LancamentoService = require('../service/lancamentoService.js');
const lancamentoService = new LancamentoService();

module.exports.addDebito = (req, res) => {
    lancamentoService.addDebito(req, res);
}

module.exports.getLancamentosDebitos = (req, res) => {
    lancamentoService.getLancamentosDebitos(req, res);
}
