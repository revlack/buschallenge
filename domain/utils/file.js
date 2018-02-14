'use strict';
const fs = require('fs');

/**
 * Decodifica arquivo no formato Base64 e cria-o fisicamente.
 */
exports.createFile = async function(fileBase64, name, extension, path) {
    return new Promise ((resolve, reject) => {
        fs.writeFile(`${path}\\${name}.${extension}`, new Buffer(fileBase64, "base64"), (err) => {
            if (err)
                reject(err);

            resolve(true);
        });       
    })    
}

exports.createFileSimple = function(path, name, content) {
    fs.writeFile(`${path}\\${name}.txt`, `${content}`, (err) => {
        if (err) throw err;
    });
}

/**
 * Remove arquivo fisicamente.
 */
exports.deleteFile = function(pathFile) {
    return new Promise ((resolve, reject) => {
        fs.unlink(pathFile, (err) => {
            if (err)
                reject(err)

            resolve(true);
        })
    })
}

/**
 * Recuperar arquivo fisicamente.
 */
exports.readFile = async function(pathFile) {
    return new Promise ((resolve, reject) => {
        fs.readFile(`${pathFile}`, (err, data) => {
            if (err)
                reject(err)

            resolve(data);
        });
    })   
}

/**
 * read file diretorio
 */
exports.readDir = async function(path) {
    return new Promise ((resolve, reject) => {
        fs.readdir(`${path}`, (err, files) => {
            if (err)
                reject(err);

            resolve(files);
        });
    })  
}

/** Convert file em base64 */
exports.encodeBase64 = function(pathFile) {
    return new Promise ((resolve, reject) => {
        fs.readFile(`${pathFile}`, (err, data) => {
            if (err)
                reject(err)

            let b = new Buffer(data);
            resolve(b.toString('base64'));
        });
    })     
}


