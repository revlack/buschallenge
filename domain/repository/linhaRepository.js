'use strict';

const mssql = require('mssql');
const connection = require('../../infrastructure/mssql.database');

class linhaRepository {  
    
    async salvaLinha(linha) {                

        let result = await connection.request()  
                                    .input('nome', mssql.NVarChar, linha.nome)                       
                                    .input('code', mssql.NVarChar, linha.code)  
                                    .query("INSERT INTO [linha] ([nome] ,[code] ) VALUES "
                                    +"(@nome, @code)");       
                                    
         return result.recordset;
  
    }   
    
     
    async getLinhaByID(codigoLinha) {                
        
                let result = await connection.request()  
                                            .input('codigoLinha', mssql.BigInt, codigoLinha)                      
                                            .query("SELECT  [codigoLinha] ,[nome] ,[code] FROM Linha WHERE  codigoLinha"
                                            +" = @codigoLinha");       
                                            
                 return result.recordset[0];
          
    }

         
    async getLinhaByCode(code) {                
        
                let result = await connection.request()  
                .input('code', mssql.NVarChar, code)                      
                .query("SELECT  [codigoLinha] ,[nome] ,[code] FROM Linha WHERE  code"
                +" = @code");                                                      
                 return result.recordset[0];
          
    }
    
}

module.exports = linhaRepository;