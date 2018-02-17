'use strict';
const mssql = require('mssql');

/**
 * Arquivo com as configurações do banco de dados.
 */
const pool = new mssql.ConnectionPool({
    user: 'dev',
    password: 'dev321',
    server: '192.168.30.60',
    port: '',
    database: 'buschallenge',
    requestTimeout: 500000,
    connectionTimeout: 600000,
    pool: {
        max: 10,
        min: 0
    }
})
pool.connect(err => { })
module.exports = pool;