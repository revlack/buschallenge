'use strict';

const lancamentoBO = require('../../domain/business/lancamentoBO.js');
const resRequestDto = require('../../domain/dto/resRequestDTO');


class lancamentoService {
    
    async addDebito(req, res) {

        res.setHeader('Content-Type', 'application/json');
        let resHttp = new resRequestDto();
        try {
            let result = await lancamentoBO.addDebito(req.body);
            resHttp.message = result;
            resHttp.code = "success";
            resHttp.statusCode = 200;  
            res.end(resHttp);   
        } catch (error) {           
          
                resHttp.code = "error";
                resHttp.statusCode = 500   
                if(error.message) {
                    resHttp.message = error.message;  
                }else{
                    resHttp.message = "Internal Server Error";
                }             
                 
            res.status(500).end(resHttp);   
      }
    }
   
    async getLancamentosDebitos(req, res){

        res.setHeader('Content-Type', 'application/json');
        let resHttp = new resRequestDto();
        try {
            let result = await lancamentoBO.getLancamentosDebitos(req.swagger.params);
            resHttp.message = result;
            resHttp.code = "success";
            resHttp.statusCode = 200;  
            res.end(resHttp.message);   
        } catch (error) {           
          
                resHttp.code = "error";
                resHttp.statusCode = 500   
                if(error.message) {
                    resHttp.message = error.message;  
                }else{
                    resHttp.message = "Internal Server Error";
                }             
                 
            res.status(500).end(resHttp);   
          }
      }           

}

module.exports = lancamentoService;