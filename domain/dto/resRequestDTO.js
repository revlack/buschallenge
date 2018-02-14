'use strict';

/**
 * Objeto para tranfego de dados da resposta ou erro de uma solicitação de post ou put
 */
class ResRequestDTO {
    constructor() {
        this.statusCode = null,
        this.code = null,
        this.message = null
    }
}

module.exports = ResRequestDTO;