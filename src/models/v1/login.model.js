
// login-model.js - A Mongoose model for a user entity
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
// !<DEFAULT> code: mongoose_schema
const mongooseSchema = require('../../services/v1/login/login.mongoose');
// !end
// !code: mongoose_imports // !end
// !code: mongoose_init // !end

let moduleExports = function (app) {
  let mongooseClient = app.get('mongooseClient');
  // !code: mongoose_func_init // !end

  // !<DEFAULT> code: mongoose_client
  const login = new mongooseClient.Schema(mongooseSchema, { timestamps: true });
  // !end

  let existingModel = mongooseClient.models['login']; // needed for client/server tests
  let returns = existingModel || mongooseClient.model('login', login);

  // !code: mongoose_func_return // !end
  return returns;
};
// !code: mongoose_more // !end

// !code: mongoose_exports // !end
module.exports = moduleExports;

// !code: mongoose_funcs // !end
// !code: mongoose_end // !end
