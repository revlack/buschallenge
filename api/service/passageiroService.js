'use strict';

const passageiroBO = require('../../domain/business/passageiroBO.js');
const resRequestDto = require('../../domain/dto/resRequestDTO');


class passageiroService {
    
    async addPassageiro(req, res) {

        res.setHeader('Content-Type', 'application/json');
        let resHttp = new resRequestDto();
        try {
            let result = await passageiroBO.addPassageiro(req.body);
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

    async delPassageiro(req, res) {

        res.setHeader('Content-Type', 'application/json');
        let resHttp = new resRequestDto();
        try {
            let result = await passageiroBO.delPassageiro(req.body.cardId);
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
}

module.exports = passageiroService;