'use strict';

const PassageiroService = require('../service/passageiroService.js');
const passageiroService = new PassageiroService();

module.exports.addPassageiro = (req, res) => {
    passageiroService.addPassageiro(req, res);
}


module.exports.delPassageiro = (req, res) => {
    passageiroService.delPassageiro(req, res);
}