
// Initializes the `masterConfig` service on path `/master-config`. (Can be re-generated.)
const createService = require('feathers-mongoose');
const createModel = require('../../../models/v1/master-config.model');
const hooks = require('./master-config.hooks');
const schema = require('./master-config.schema');
const { Organizations } = require('./organizations.class');
const { CustomOrganizations } = require('./custom-organizations.class');
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app) {
  let Model = createModel(app);
  let paginate = app.get('paginate');
  // !code: func_init // !end

  let options = {
    Model,
    paginate,
    whitelist: ['$regex']
    // !code: options_more // !end
  };
  // !code: options_change // !end

  // Initialize our service with any options it requires
  // !<DEFAULT> code: extend
  const masterConfig = createService(options);
  // !end

  //adding setting of swagger 
  masterConfig.docs = {
    idType: 'string',
    securities: ['all'],
    description: 'Service to manage  master-config',
    definitions: {
      ' master-config_list': {
        $ref: '#/definitions/master-config'
      },
      'master-config': schema.schema
    }
  };

  // Get our initialized service so that we can register hooks
  const service = app.use('/v1/master-config', new Organizations(options, app),(req, res, next) => {
    if (res.hook.method === 'find') {
        res.setHeader('X-Total-Count', res.hook.params.total);
    }
    next();
});

 // Initialize our custom route
 app.use('/v1/custom-master-config', new CustomOrganizations(options, app),(req, res, next) => {
  if (res.hook.method === 'find') {
      res.setHeader('X-Total-Count', res.hook.params.total);
  }
  next();
});
  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
