'use strict';
const resRequestDto = require('../../domain/dto/resRequestDTO');

module.exports.processaHome = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let resHttp = new resRequestDto();
    try {
        let obj = { mensagem: "WebService rodando corretamente" };        
        res.end(obj);
    } catch (error) {
        // log register.
        console.log(`Erro Home: ${error.message}`);
        // response message.
        resHttp.code = "error";
        resHttp.statusCode = 500;   
        resHttp.message = "internal server error";  
        res.status(500).end(resHttp);  
    }
}