const _ = require('lodash');
const services = {
  'v1/master-config': [],
  'v1/custom-master-config': []
};

module.exports = () => async context => {
  // If necessary set services
     if (!context.params.$resolversSet) {
      context.params.$services = services;
     }

  return context;
};
