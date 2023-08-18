
// Hooks for service `masterConfig`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
const queries = require('../../../hooks/queries');
const {shapePayload} = require('../../../hooks/shapePayload');
const {checkMethodPermission} = require('../../../hooks/checkMethodPermission.js');
// !code: imports
const {
  schema: {
    properties: schema
  }
} = require('./master-config.schema');
// !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// eslint-disable-next-line no-unused-vars
const {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
} = require("./master-config.validate");
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !<DEFAULT> code: before
    all: [],
    find: [checkMethodPermission,queries(schema)],
    get: [checkMethodPermission,queries(schema)],
    create: [checkMethodPermission],
    update: [checkMethodPermission],
    patch: [checkMethodPermission],
    remove: [checkMethodPermission]
    // !end
  },

  after: {
    // !<DEFAULT> code: after
    all: [],
    find: [shapePayload],
    get: [shapePayload],
    create: [shapePayload],
    update: [shapePayload],
    patch: [shapePayload],
    remove: [shapePayload]
    // !end
  },

  error: {
    // !<DEFAULT> code: error
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
    // !end
  },
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
