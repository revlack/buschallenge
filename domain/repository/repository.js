'use strict';
const mssql = require('mssql');
const connection = require('../../infrastructure/mssql.database');

/**
 * Método genérico de inserção de dados.
 */
exports.insert = async (sql) => {
    let result = await connection.request().query(sql);
    return result;
}

/**
 * Método genérico para execução de querys..
 */
exports.query = async (sql) => {
    return await connection.request().query(sql);
}

/**
 * Método genérico para execução de procedures.
 */
exports.procedure = async (sp) => {
    return await connection.request().execute(sp);
}

/**
 * Método genérico para execução de procedures.
 */
exports.procFindById = async (sp, id) => {
    return await connection.request()
        .input('pCodigo', mssql.Int, id)
        .execute(sp);
}
