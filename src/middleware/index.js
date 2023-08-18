
// Configure middleware. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end
const parse = require('url-parse');
// eslint-disable-next-line no-unused-vars
let moduleExports = app => {
  // !code: func_init 
  // !end
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  // !code: middleware 
  const { checkPermission } = require('../../src/checkPermission.js'); // Import your checkPermission function


  const isProduction = process.env.NODE_ENV === 'production';

    //we need to get url & user for checkPermission
    app.use(async(req, res, next) => {
        // X-Host for Production, Host for development
        const url = parse(
            req.get('X-Host') ? req.get('X-Host') : `${req.protocol}://${req.get('host')}`
        );
        req.feathers.url = url;
        req.feathers.user = req.user;
     
     console.log(req.headers.authorization)

      if(req.path !== '/login'){
           // Assuming checkPermission returns true if user has permission, otherwise false
           const [hasPermission] = await checkPermission(req.headers.authorization); // Modify this according to your checkPermission function

           if (!hasPermission) {
             return res.status(403).json({ message: 'Permission denied' });
           }
  }
        next();
    });


  // !end
  // !code: func_return // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
