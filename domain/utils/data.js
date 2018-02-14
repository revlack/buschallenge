'use strict';
const fs = require('fs');

/**
 * Converte data BR para US.
 */
exports.parseDataUSA = function(data) {
    let split = data.split('/');
    let newDate = `${split[2]}-${split[1]}-${split[0]} 00:00`;
    let result = new Date(Date.parse(newDate)); 
    return result;
}

/**
 * Converte data BR para US.
 */
exports.parseBrForUs = function(data) {
    let split = data.split('/');
    let newDate = `${split[2]}-${split[1]}-${split[0]}`;
    return newDate;
}

/**
 * Converte data dd/MM/yyyy para yyyy/MM/dd 00:00
 */
exports.parseDateForUs = function(data) {
    let split = data.split('/');
    return new Date(`${split[2]}-${split[1]}-${split[0]} 00:00`);
}

/**
 * Converte data e hora BR para US.
 */
exports.parseDataHoraUSA = function(data, hora) {
    let split = data.split('/');
    let newDate = `${split[2]}-${split[1]}-${split[0]} ${hora}`;
    let result = new Date(Date.parse(newDate)); 
    return result;
}


/**
 * Converte data yyyy-MM-dd HH:MM para dd-MM-yyyy HH:MM
 */
exports.parseDateTimeForBR = function(data) {
    let dataAux = new Date(data.valueOf() + data.getTimezoneOffset() * 60000);
    let dia =   ((dataAux.getDate() + 1) < 10) ? `0${dataAux.getDate()}` : dataAux.getDate();
    let mes = ((dataAux.getMonth() + 1) < 10 ) ? `0${dataAux.getMonth() + 1}` : dataAux.getMonth() + 1;
    let ano = dataAux.getFullYear();

    let hora = (dataAux.getHours() < 10) ? `0${dataAux.getHours()}` : dataAux.getHours();
    let minuto = (dataAux.getMinutes() < 10) ? `0${dataAux.getMinutes()}` : dataAux.getMinutes();
    let newHora = `${hora}:${minuto}`;

    let newDate = `${dia}/${mes}/${ano} ${newHora}`;
    return newDate;
}

/**
 * Converte data dd-MM-yyyy HH:MM para yyyy-MM-dd HH:MM
 */
exports.parseDateTimeForUS = function(data) {
    let dataAux = data.split(" ");
    let hora = dataAux[1];
    let splitHora = hora.split(':');
    let horaAux = `${splitHora[0] - 2}:${splitHora[1]}`;

    let split = dataAux[0].split('/');
    let newDate = `${split[2]}-${split[1]}-${split[0]} ${horaAux}`;
    return new Date(newDate);
}

/**
 * Converte data de US para BR.
 */
exports.parseDataBR = function(data) {
    let dataAux = new Date(data.valueOf() + data.getTimezoneOffset() * 60000);
    let dia =   ((dataAux.getDate() + 1) < 10) ? `0${dataAux.getDate()}` : dataAux.getDate();
    let mes = ((dataAux.getMonth() + 1) < 10 ) ? `0${dataAux.getMonth() + 1}` : dataAux.getMonth() + 1;
    let ano = dataAux.getFullYear();
    let newDate = `${dia}/${mes}/${ano}`;
    return newDate;
}

/**
 * Recupera a HH:MM
 */
exports.getHora = function(data) {
    let dataAux = new Date(data.valueOf() + data.getTimezoneOffset() * 60000);
    let hora = (dataAux.getHours() < 10) ? `0${dataAux.getHours()}` : dataAux.getHours();
    let minuto = (dataAux.getMinutes() < 10) ? `0${dataAux.getMinutes()}` : dataAux.getMinutes();
    let newHora = `${hora}:${minuto}`;
    return newHora;
}

/**
 * Recupera valor TimesTamp
 */
exports.getTimestamp = function(data, hora) {
    let newDate = Date.parse(`${data} ${hora}`);
    return newDate;
}

/**
 * Recupera data de timestamp
 */
exports.getDataByTimestamp = function(timestamp) {
    return new Date(timestamp);
}

