/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const grpc = require('@grpc/grpc-js');
const server = new grpc.Server();
const logger = require('./logger');
const protoLoader = require('@grpc/proto-loader');
const jwt = require('jsonwebtoken');
const config = require('config');

// Get current time
const t0 = new Date();

//Following options object closely approximates the existing behavior of grpc.load
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};


// Generic function to load proto files
function loadProtoDefinition(path) {
    const packageDefinition = protoLoader.loadSync(path, options);
    const proto = grpc.loadPackageDefinition(packageDefinition);

    return grpc.loadPackageDefinition(proto);
}

// Validate Internal JWT sent by microservice to authenticate calls
function validateJWT(call) {
    let result;
    const authToken = call.metadata.get('authorization');
    if (authToken.length > 0) {
        const beareToken = authToken[0].split(' ');
        jwt.verify(beareToken[1], config.jwt.secret, (err, authData) => {
            if (err) {
                logger.applog('debug', t0, err);
                result = false;
            } else {
                logger.applog('debug', t0, 'Token is valid!');
                result = true;
            }
        });

        return result;
    } else {
        logger.applog('debug', t0, 'Authentication failed!! ');
        result = false;
        return result;
    }
}

// Start grpc server
function grpcServer(app) {
    const { host, port } = app.get('gRPC');

    const ip = host + ':' + port;

    server.bindAsync(ip, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err != null) {
            logger.applog('error', t0, err, '', err);
        } else {
            logger.applog('info', t0, 'gRPC server started on ' + ip);
            // eslint-disable-next-line no-console
            server.start();
            return server;
        }
    });
}

// Send customized gRPC errors
function sendError(code, message) {
    const err = new Error();
    err.code = code;
    err.message = message;

    return err;
}

// Expose gRPC server to services
function getServer() {
    return server;
}

module.exports = {
    grpcServer,
    validateJWT,
    loadProtoDefinition,
    getServer,
    sendError
};
