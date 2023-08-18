
// Configure Feathers app. (Can be re-generated.)
// !code: preface // !end
const path = require('path');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./logger');

// !<DEFAULT> code: favicon_import
const favicon = require('serve-favicon');
//FOR ADDING GRPC-SERVICE
const grpc = require('./grpc.server');
const grpcService = require('./grpc-config/services/grpc.services.js');
// !end

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const generatorSpecs = require('../feathers-gen-specs.json');
const authentication = require('./authentication');

const mongoose = require('./mongoose');
// !code: imports
const swagger = require('feathers-swagger'); // !end
// !code: init // !end

const app = express(feathers());

// For CORS need to expose custom headers
const corsOptions = {
    exposedHeaders: 'X-Total-Count'
};
app.use(cors(corsOptions));

// Load app configuration
app.configure(configuration());
// !<DEFAULT> code: init_config
app.set('generatorSpecs', generatorSpecs);
// !end
// !code: init // !end

//const app = express(feathers());
// !code: use_start // !end

// Load app configuration
app.configure(configuration());
// !<DEFAULT> code: init_config
app.set('generatorSpecs', generatorSpecs);
// !end

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet(
  // !code: helmet_config // !end
));
app.use(cors(
  // !code: cors_config // !end
));
app.use(compress(
  // !code: compress_config // !end
));
app.use(express.json(
  // !code: json_config // !end
));
app.use(express.urlencoded(
  // !<DEFAULT> code: urlencoded_config
  { extended: true }
  // !end
));
// !<DEFAULT> code: use_favicon
// Use favicon
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// !end
// !<DEFAULT> code: use_static
// Host the public folder
app.use('/', express.static(app.get('public')));
// !end
// !code: use_end
app.configure(
    swagger({
        docsPath: '/docs',
        uiIndex: true,
        specs: {
            basePath: '/drm/config-service',
            schemes: ['http', 'https'],
            info: {
                title: 'Config Service',
                description: 'Config Service API',
                version: '1.0.0'
            },
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            },
            security: [
                {
                    Bearer: []
                }
            ]
        }
    })
);
// !end

// Set up Plugins and providers
// !code: config_start // !end
app.configure(express.rest(
  // !code: express_rest // !end
));
app.configure(socketio(
  // !code: express_socketio // !end
));
// Configure database adapters
app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Configure authentication (see `authentication.js`)
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);

// !code: config_middle // !end

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));
// !code: config_end // !end

app.hooks(appHooks);

// Configure GRPC server and its sevices
app.configure(grpc.grpcServer);
app.configure(grpcService.startService);

const moduleExports = app;
// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
