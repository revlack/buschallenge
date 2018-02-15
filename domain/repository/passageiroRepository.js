'use strict';

const mssql = require('mssql');
const connection = require('../../infrastructure/mssql.database');

class passageiroRepository {  
    
    async adicionar(passageiro) {                

                let result = await connection.request()  
                                    .input('nome', mssql.NVarChar, passageiro.nome)                       
                                    .input('email', mssql.NVarChar, passageiro.email)   
                                    .input('cardID', mssql.NVarChar, passageiro.cardID)   
                                    .input('senha', mssql.NVarChar(128), passageiro.senha) 
                                    .query("INSERT INTO [Passageiro] ([nome] ,[email] ,[cardID],[senha] ,[InseridoEm]) VALUES "
                                    +"(@nome, @email, @cardID, @senha, getdate())");       
                                    
         return result.recordset;
  
    }   
    
     
    async getPassageiroByID(codigoPassageiro) {                
        
                let result = await connection.request()  
                                            .input('codigoPassageiro', mssql.BigInt, codigoPassageiro)                      
                                            .query("SELECT  [codigoPassageiro] ,[nome] ,[email] ,[cardID],[senha] ,[InseridoEm] FROM Passageiro WHERE  codigoPassageiro"
                                            +" = @codigoPassageiro");       
                                            
                 return result.recordset[0];
          
    }

    async getPassageiroByEmail(email) {                
        
                let result = await connection.request()  
                                            .input('email', mssql.NVarChar, email)                      
                                            .query("SELECT  [codigoPassageiro] ,[nome] ,[email] ,[cardID],[senha] ,[InseridoEm] FROM Passageiro WHERE  email =  @email");       
                                            
                 return result.recordset[0];
          
    }

         
    async getPassageiroByCard(cardID) {                
        
                let result = await connection.request()  
                                            .input('cardID', mssql.NVarChar, cardID)                      
                                            .query("SELECT  [codigoPassageiro] ,[nome] ,[email] ,[cardID],[senha] ,[InseridoEm] FROM Passageiro WHERE cardID = @cardID"); 
                 return result.recordset[0];
          
    }
}

module.exports = passageiroRepository;