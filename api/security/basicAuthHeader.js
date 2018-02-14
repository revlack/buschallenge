'use strict';

/**
 * Validação das credenciais do método de autenticação Basic-Authorization.
 */
exports.validate = async (username, password) => {
    if (username == 'Usuario' && password == 'Senha')
        return true;
    else   
        return false;
}