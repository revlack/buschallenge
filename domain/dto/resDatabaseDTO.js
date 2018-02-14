'use strict';

/**
 * Objeto para tranfego de dados da resposta ou erro de uma requisição no banco de dados.
 */
class ResDatabaseDTO {
    constructor() {
        this.error = false,
        this.messageError = null;
        this.data = null
    }
}

module.exports = ResDatabaseDTO;