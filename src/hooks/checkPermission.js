const _ = require('lodash');
const axios = require('axios');
const { getItems } = require('feathers-hooks-common');
const config = require('config');
const { BadRequest, Forbidden } = require('@feathersjs/errors');
const jwt_decode = require('jwt-decode');
const logger = require('../logger.js');

module.exports = () => async (context) => {
    try {
        const {
            params: { provider }
        } = context;
        const isProduction = process.env.NODE_ENV === 'production';

        // Only check permission for external requests.
        if (!isProduction || !provider || provider === 'grpc') {
            return context;
        }
        const {
            method,
            params: { user }
        } = context;
        const { permissions } = user;

        if (!isProduction || context.params.provider == 'grpc') {
            return context;
        }

        if (!permissions) {
            throw new Forbidden('User has no permissions set.');
        }

        const methodToCheckRelatedParty = ['create', 'patch', 'update'];
        const serviceName = _.camelCase(_.last(context.path.split('/')));
        let serviceMethod = method;

        if (_.isEqual(serviceName, 'masterConfig') && methodToCheckRelatedParty.includes(serviceMethod)) {
            //Assigning name of user
            if (!_.isEqual(context.data.relatedParty, undefined)) {
                const relatedParty = context.data.relatedParty;
                //If there is 'relatedParty' on payload
                if (!_.isEqual(relatedParty.length, 0)) {
                    //checking name on that
                    const keys = Object.keys(relatedParty[0]);
                    //If 'relatedParty' has name
                    if (keys.includes('name')) {
                        relatedParty[0].name = context.params.user.sub;
                    } else {
                        //If 'relatedParty' has not name
                        Object.assign(relatedParty[0], { name: context.params.user.sub });
                    }
                } else {
                    const valueForNmeOfRelatedParty = [{ name: context.params.user.sub }];

                    Object.assign(context.data, { relatedParty: valueForNmeOfRelatedParty });
                }
            } else {
                const valueForRelatedParty = [
                    {
                        name: context.params.user.sub,
                        email: '',
                        phone: ''
                    }
                ];

                Object.assign(context.data, { relatedParty: valueForRelatedParty });
            }
        }

        return context;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};

function formatString(string = '') {
    const formattedString = string.replace(/\s/g, '').toLowerCase();
    return formattedString;
}
