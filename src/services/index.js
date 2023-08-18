
// Configure the Feathers services. (Can be re-generated.)
let login = require('./v1/login/login.service');
let masterConfig = require('./v1/master-config/master-config.service');

// !code: imports // !end
// !code: init // !end

// eslint-disable-next-line no-unused-vars
let moduleExports = function (app) {
  app.configure(login);
  app.configure(masterConfig);
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
