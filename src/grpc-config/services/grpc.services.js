// Importing gRPC server and
var gg = require('@grpc/grpc-js');
var grpc = require('../../grpc.server');
const logger = require('../../logger');
var utility = require('../util/utility.js');
const _ = require('lodash');


// Get proto file paths and load their definitions
var MASTERCONFIG_PATH = './src/grpc-config/protos/master-config.proto';
var masterconfig = grpc.loadProtoDefinition(MASTERCONFIG_PATH);

var server = grpc.getServer();

// Capture query params from request for READ/READALL func
function getQueries(data) {
  if (data === null || data === {}) {
    return {
      query: {},
      route: {},
      provider: 'grpc',
    };
  } else {
    var queryObj = {
      query: {},
      route: {},
      provider: 'grpc',
    };

    //adding functionality for generate other fields in query
    for (let value of Object.keys(data)) {
      switch (value) {
        case 'Query': //Query
          if (data.Query !== '') {
            queryObj.query['Query'] = data.Query;
          } else {
            delete queryObj.query['Query'];
          }
          break;
        default:
          break;
      }
    }

    Object.entries(queryObj.query).forEach(([key, value]) => {

      //Query
      if (key === 'Query') {
        //to converting '&' to ','
        var finalConvert = JSON.stringify(queryObj.query);

        var result = JSON.parse(finalConvert);
        let quertOfQuery = JSON.stringify(result);
        var x = 0;
        var y = 0;
        let finalQuertOfQuery = '';
        var flag = true;
        if (quertOfQuery.includes('Query')) {
          var indexQuery = quertOfQuery.indexOf('Query');
          indexQuery = indexQuery + 1;
          var finalQuery = quertOfQuery.replace('"Query":', '');

          for (x; x < finalQuery.length; x++) {
            if (flag) {
              finalQuertOfQuery = finalQuertOfQuery + finalQuery[x];
              x + 1 === indexQuery ? (flag = false) : (flag = true);
            } else {
              if (finalQuery[x] === '=') {
                finalQuery[x].replace(finalQuery[x], '');
                finalQuertOfQuery = finalQuertOfQuery + '"' + ":" + '"';
              } else if (finalQuery[x] === '&') {
                finalQuertOfQuery = finalQuertOfQuery + '","';
              } else {
                finalQuertOfQuery = finalQuertOfQuery + finalQuery[x];
              }
            }
          }
        }
        queryObj.query = JSON.parse(finalQuertOfQuery);
      }

    });

    return queryObj;
  }
}

// Capture query params from request for Patch func
function patchQueries(data) {
  if (data === undefined || data === null || data === {}) {
    return {
      query: {},
      route: {},
      provider: 'grpc',
    };
  } else {
    return {
      query: {
        action: data.action,
      },
      route: {},
      provider: 'grpc',
    };
  }
}

// start startmMasterConfigService
function startmMasterConfigService(app) {

  let getObjectById = {};
  server.addService(masterconfig.protos.service.MasterConfig.service, {
    // ReadAll Command
    ReadAll: function (call, callback) {
      // Get current time
      var t0 = new Date();
      var resultMessages = [];
      var count;
      var valid = grpc.validateJWT(call);
      logger.applog('debug', t0, 'validation is...' + valid);
      if (valid) {
        logger.applog('debug', t0, 'Caller is authorized');
        const appLimit = getPaginationMax(app);
        if (call.request.limit > appLimit) {
          call.request.paginate = false;
          app
            .service('v1/master-config')
            .find(getQueries(call.request))
            .then((messages) => {
              count = messages.length;
              callback(null, {
                totalCount: count,
                appLimit: appLimit
              });
            })
            .catch((error) => {
              logger.applog('error', t0, error);
              callback(error, '');
            });
        } else {
          app
            .service('v1/master-config')
            .find(getQueries(call.request))
            .then((messages) => {
              count = messages.length;
              messages.forEach(function (message) {
                resultMessages.push(
                  utility.replaceKeyWithoutSpecailSymbels(message)
                );
              });
              callback(null, {
                masterConfig: resultMessages,
                totalCount: count,
                appLimit: appLimit
              });
            })
            .catch((error) => {
              logger.applog('error', t0, JSON.stringify(error), error);
              callback(error, '');
            });
        }
      } else {
        logger.applog('debug', t0, 'unauthorized');
        callback(
          grpc.sendError(
            gg.status.UNAUTHENTICATED,
            'User is UNAUTHENTICATED..'
          ),
          null
        );
      }
    },

    // Create Command
    Create: function (call, callback) {
      // Get current time
      var t0 = new Date();

      var valid = grpc.validateJWT(call);
      logger.applog('debug', t0, 'validation is..' + valid);
      if (valid) {
        logger.applog('debug', t0, 'Caller is authorized');
        app
          .service('v1/master-config')
          .create(
            utility.replaceKeyWithSpecialSymble(call.request.masterConfig)
          )
          .then((messages) => {
            logger.applog('debug', t0, JSON.stringify(messages));

            callback(null, {
              id: messages.id,
            });
          })
          .catch((error) => {
            logger.applog('error', t0, JSON.stringify(error), error);
            callback(error, '');
          });
      } else {
        logger.applog('debug', t0, 'unauthorized');
        callback(
          grpc.sendError(
            gg.status.UNAUTHENTICATED,
            'User is UNAUTHENTICATED..'
          ),
          null
        );
      }
    },

    // Delete Command
    Delete: function (call, callback) {
      // Get current time
      var t0 = new Date();

      var valid = grpc.validateJWT(call);

      logger.applog('debug', t0, 'validation is..' + valid);
      if (valid) {
        logger.applog('debug', t0, 'Caller is authorized');

        app
          .service('v1/master-config')
          .remove({
            _id: call.request.id,
          })
          .then((messages) => {
            logger.applog(
              'debug',
              t0,
              'deleted record by id: ' + JSON.stringify(messages),messages
            );

            callback(null, {
              result: 'deleted record successfully with id ' + messages.id,
            });
          })
          .catch((error) => {
            logger.applog('error', t0, JSON.stringify(error),error);
            callback(error, '');
          });
      } else {
        logger.applog('debug', t0, 'unauthorized');
        callback(
          grpc.sendError(
            gg.status.UNAUTHENTICATED,
            'User is UNAUTHENTICATED..'
          ),
          null
        );
      }
    },

    // ReadById Command
    ReadById: function (call, callback) {
      // Get current time
      var t0 = new Date();

      var valid = grpc.validateJWT(call);

      logger.applog('debug', t0, 'validation is..' + valid);
      if (valid) {
        logger.applog('debug', t0, 'Caller is authorized');

        app
          .service('v1/master-config')
          .get({
              _id: call.request.id,
            },
            getQueries(call.request)
          )
          .then((messages) => {
            logger.applog(
              'debug',
              t0,
              'after executing read by id method: ' +
              utility.replaceKeyWithoutSpecailSymbels(
                JSON.stringify(messages)
              ),'',messages
            );

            callback(null, {
              masterConfig: utility.replaceKeyWithoutSpecailSymbels(
                messages
              ),
            });
          })
          .catch((error) => {
            logger.applog('error', t0, JSON.stringify(error),error);
            callback(error, '');
          });
      } else {
        logger.applog('debug', t0, 'unauthorized');
        callback(
          grpc.sendError(
            gg.status.UNAUTHENTICATED,
            'User is UNAUTHENTICATED..'
          ),
          null
        );
      }
    },

    // Patch Command
    Update: function (call, callback) {
      // Get current time
      var t0 = new Date();

      var valid = grpc.validateJWT(call);

      logger.applog('debug', t0, 'validation is..' + valid);
      if (valid) {
        logger.applog('debug', t0, 'Caller is authorized');

        app
          .service('v1/master-config')
          .update(
            call.request.masterConfig.id,
            utility.replaceKeyWithSpecialSymble(call.request.masterConfig)
          )
          .then((messages) => {
            logger.applog(
              'debug',
              t0,
              'after data updated: ' +
              utility.replaceKeyWithoutSpecailSymbels(
                JSON.stringify(messages)
              ),messages
            );

            callback(null, {
              masterConfig: utility.replaceKeyWithoutSpecailSymbels(
                messages
              ),
            });
          })
          .catch((error) => {
            logger.applog('error', t0, JSON.stringify(error),'',error);
            callback(error, '');
          });
      } else {
        logger.applog('debug', t0, 'unauthorized');
        callback(
          grpc.sendError(
            gg.status.UNAUTHENTICATED,
            'User is UNAUTHENTICATED..'
          ),
          null
        );
      }
    },
    Patch: function (call, callback) {
      // Get current time
      var t0 = new Date();

      var formattedRequest = {};
      let finalObject = {};
      var valid = grpc.validateJWT(call);

      logger.applog('debug', t0, 'validation is..' + valid);
      if (valid) {
        app
          .service('v1/master-config')
          .get({
              _id: call.request.id,
            },
            getQueries(call.request)
          )
          .then((messages) => {
            logger.applog(
              'debug',
              t0,
              'after executing read by id method for patch: ' +
              JSON.stringify(messages)
            );

            getObjectById = messages;
            var requestWithSpecialSymbles = utility.replaceKeyWithSpecialSymble(
              call.request.masterConfig
            );
            formattedRequest = utility.patchFormateJSON(
              requestWithSpecialSymbles
            );
            var finalObject = utility.deepmerge(
              getObjectById,
              formattedRequest
            );
            app
              .service('v1/master-config')
              .patch(
                call.request.id,
                finalObject,
                patchQueries(
                  call.request.action === '' ?
                  call.request.action :
                  call.request
                )
              )
              .then((messages) => {
                logger.applog(
                  'debug',
                  t0,
                  'after data updated: ' +
                  utility.replaceKeyWithoutSpecailSymbels(
                    JSON.stringify(messages)
                  ),'',messages
                );
                callback(null, {
                  masterConfig: utility.replaceKeyWithoutSpecailSymbels(
                    messages
                  ),
                });
              });
          })
          .catch((error) => {
            logger.applog('error', t0, JSON.stringify(error),error);
            callback(error, '');
          });
      } else {
        logger.applog('debug', t0, 'unauthorized');
        callback(
          grpc.sendError(
            gg.status.UNAUTHENTICATED,
            'User is UNAUTHENTICATED..'
          ),
          null
        );
      }
    },
    // Read all resource types and base types command
    ReadAllResourceTypes: function (call, callback) {
      // Get current time
      var t0 = new Date();
      var resultMessages = [];
      var count;
      var valid = grpc.validateJWT(call);
      logger.applog('debug', t0, 'validation is...' + valid);
      if (valid) {
        logger.applog('debug', t0, 'Caller is authorized');
        const appLimit = getPaginationMax(app);

        if (call.request.limit > appLimit) {
          call.request.paginate = false;
          app
            .service('v1/master-config')
            .find(getQueries(call.request))
            .then((messages) => {
              count = messages.length;
              callback(null, {
                totalCount: count,
                appLimit: appLimit
              });
            })
            .catch((error) => {
              logger.applog('error', t0, JSON.stringify(error));
              callback(error, '');
            });
        } else {
          app
            .service('v1/master-config')
            .find(getQueries(call.request))
            .then((messages) => {
              count = messages.length;
              messages.forEach(function (message) {
                resultMessages.push(
                  utility.replaceKeyWithoutSpecailSymbels(message)
                );
              });
              callback(null, {
                masterConfig: resultMessages,
                totalCount: count,
                appLimit: appLimit
              });
            })
            .catch((error) => {
              logger.applog('error', t0, JSON.stringify(error));
              callback(error, '');
            });
        }
      } else {
        logger.applog('debug', t0, 'unauthorized');
        callback(
          grpc.sendError(
            gg.status.UNAUTHENTICATED,
            'User is UNAUTHENTICATED..'
          ),
          null
        );
      }
    },
  });
}


function getPaginationMax(app) {
  return app.settings.paginate.max;
}

// Start GRPC Services
function startService(app) {
  startmMasterConfigService(app);
}

module.exports = {
  startService,
};
