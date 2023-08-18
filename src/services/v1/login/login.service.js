
// Initializes the `login` service on path `/login`. (Can be re-generated.)
const createService = require('feathers-mongoose');
const createModel = require('../../../models/v1/login.model');
const hooks = require('./login.hooks');
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app) {
  let Model = createModel(app);
  let paginate = app.get('paginate');
  // !code: func_init // !end

  let options = {
    Model,
    paginate,
    // !code: options_more // !end
  };
  // !code: options_change // !end

  // Initialize our service with any options it requires
  // !<DEFAULT> code: extend
  app.use('/login', createService(options));
  // !end

  // Get our initialized service so that we can register hooks
  const service = app.service('login');

  service.hooks(hooks);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
