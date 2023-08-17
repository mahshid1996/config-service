
// Application hooks that run for every service. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common');
// !<DEFAULT> code: imports
const log = require('./hooks/log');
const renameId = require('./hooks/renameId');

// !end

// !<DEFAULT> code: used
// eslint-disable-next-line no-unused-vars
const { iff } = commonHooks;
// !end
// !code: init // !end

let moduleExports = {
  before: {
    // !<DEFAULT> code: before
    all: [ function (context) {
      return context;
    }, log()],
    find: [],
    get: [],
    create: [],
    update: [], //commonHooks.disableMultiItemChange()
    patch: [], //commonHooks.disableMultiItemChange()
    remove: [] //commonHooks.disableMultiItemChange()
    // !end
  },

  after: {
    // !<DEFAULT> code: after
    all: [log() ],
    find: [renameId(),
       function (context) {
      context.params.total = context.result.data ? context.result.total : undefined;
      context.result = context.result.data ? context.result.data : context.result;
    }],
    get: [renameId()],
    create: [renameId()],
    update: [renameId()],
    patch: [renameId()],
    remove: [renameId()]
    // !end
  },

  error: {
    // !<DEFAULT> code: error
    all: [log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
