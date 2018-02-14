'use strict';
const fs = require('fs');
const path = require('path');
const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const serverConfig = require('./infrastructure/server.config');
const bodyParser = require('body-parser');
const auth = require('basic-auth');
const basicAuth = require('./api/security/basicAuthHeader');

app.use(bodyParser.json({ 'type': '*/*',limit: '20mb' }));

// Configuração para teste
module.exports = app;

let config = {
  appRoot: __dirname,
  swaggerSecurityHandlers: {
    BasicAuth: function (req, authOrSecDef, scopesOrApiKey, callback) {
      let credenciais = auth(req);     
      if (credenciais !== undefined && credenciais !== null) {  
        let authValid = basicAuth.validate(credenciais.name, credenciais.pass);
        if (authValid)
          callback()        
        else
          callback(new Error('access denied!'));
      } else {
        callback(new Error('access denied!'));
      }
    } 
  }
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname,'api/swagger/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

/**
 * Inicializa o Swagger middleware.
 */
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(middleware.swaggerUi());
});


/** 
 * Create server.
 */
SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  
  swaggerExpress.register(app);
  app.listen(serverConfig.PORT, serverConfig.ADDRESS);
});
