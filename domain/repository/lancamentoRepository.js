'use strict';

const mssql = require('mssql');
const connection = require('../../infrastructure/mssql.database');

class lancamentoRepository {  
    
    async salvaLancamento(lancamento) {                

                let result = await connection.request()  
                                    .input('codigoPassageiro', mssql.Int, lancamento.codigoPassageiro)                       
                                    .input('codigoLinha', mssql.Int, lancamento.codigoLinha)   
                                    .input('codigoUnidade', mssql.Int, lancamento.codigoUnidade)   
                                    .input('valor', mssql.Decimal, lancamento.valor) 
                                    .query("INSERT INTO [Lancamento] ([codigoPassageiro] ,[codigoLinha] ,[codigoUnidade],[InseridoEm],[valor]) VALUES "
                                    +"(@codigoPassageiro, @codigoLinha, @codigoUnidade, getdate(), @valor )");       
                                    
         return result.recordset;
  
    }   
    
     
    async getSaldoByCodigoPassageiro(codigoPassageiro, data = null) {               

                if(data){
                let result = await connection.request()  
                                            .input('codigoPassageiro', mssql.BigInt, codigoPassageiro)                      
                                            .input('data', mssql.DateTime, data)  
                                            .query("SELECT SUM(valor)  FROM Lancamento WHERE  codigoPassageiro"
                                            +" = @codigoPassageiro AND dataLancamento <= @data ");   
                    return result.recordset;    

                }else{

                    let result = await connection.request()  
                    .input('codigoPassageiro', mssql.BigInt, codigoPassageiro)                      
                    .query("SELECT SUM(valor)  FROM Lancamento WHERE  codigoPassageiro"
                    +" = @codigoPassageiro AND dataLancamento <= getdate() ");   

                    return result.recordset;   
                }                                         
          
    }      
    
    async getLancamentosByCodigoPassageiro(codigoPassageiro, dataInicio = null, dataFim = null) {               
        
                  if(dataInicio && dataFim){
                     let result = await connection.request()  
                                                    .input('codigoPassageiro', mssql.BigInt, codigoPassageiro)                      
                                                    .input('dataInicio', mssql.DateTime, data)  
                                                    .input('dataFim', mssql.DateTime, data)  
                                                    .query("SELECT codigoLancamento, codigoPassageiro, codigoLinha, codigoUnidade, InseridoEm , valor FROM Lancamento WHERE  codigoPassageiro"
                                                    +" = @codigoPassageiro AND dataLancamento >= @dataInicio  AND dataLancamento >= @dataFim ");   
                            return result.recordset;    
        
                        }else{
        
                            let result = await connection.request()  
                            .input('codigoPassageiro', mssql.BigInt, codigoPassageiro)                      
                            .query("SELECT codigoLancamento, codigoPassageiro, codigoLinha, codigoUnidade, InseridoEm , valor FROM Lancamento WHERE  codigoPassageiro"
                            +" = @codigoPassageiro AND dataLancamento <= getdate() ");   
        
                            return result.recordset;   
                        }                                         
                  
            }      
}

module.exports = lancamentoRepository;