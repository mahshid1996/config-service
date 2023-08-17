
// masterConfig-model.js - A Mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
// !<DEFAULT> code: mongoose_schema
const { increaseVersion } = require('../increaseVersion');
const mongooseSchema = require('../../services/v1/master-config/master-config.mongoose');
// !end

//added to code generation 
const mongoose = require('mongoose');
const mongooseIncrement = require('mongoose-increment');
const increment = mongooseIncrement(mongoose);
// !code: mongoose_imports // !end
// !code: mongoose_init // !end

let moduleExports = function (app) {
  let mongooseClient = app.get('mongooseClient');
  // !code: mongoose_func_init // !end

  // !<DEFAULT> code: mongoose_client
  const masterConfig = new mongooseClient.Schema(mongooseSchema, { 
    timestamps: true ,
     // Case Insensitive Indexes
     collation: {locale: 'en',strength: 1,caseLevel: true},
     versionKey: 'version' //adding the name of increasing field
  });
  // !end

 //code generation
 masterConfig.plugin(increment, {
  type: String,
  modelName: 'masterConfig',
  fieldName: 'code',
  prefix: 'CF'
});


 //for increasing version number
  //start
  masterConfig.pre('updateMany', increaseVersion);
  masterConfig.pre('findOneAndUpdate', increaseVersion);
  //end

  let existingModel = mongooseClient.models['masterConfig']; // needed for client/server tests
  let returns = existingModel || mongooseClient.model('masterConfig', masterConfig);

  // !code: mongoose_func_return // !end
  return returns;
};
// !code: mongoose_more // !end

// !code: mongoose_exports // !end
module.exports = moduleExports;

// !code: mongoose_funcs // !end
// !code: mongoose_end // !end
