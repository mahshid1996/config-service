
/* eslint quotes: 0 */
// Defines Mongoose model for service `masterConfig`. (Can be re-generated.)
const merge = require('lodash.merge');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    href: String,
    name: String,
    description: String,
    status: {
      type: String,
      enum: [
        "Active",
        "InActive"
      ]
    },
    code: String,
    "@type": String,
    "@baseType": {
      type: String
    },
    batchStart: String,
    currentBatch: String,
    relatedParty: [
      {
        _id:false,
        name: String,
        email: String,
        phone: String
      }
    ],
    attachment: [
      {
        _id:false,
        href: String,
        attachmentType: String,
        content: String,
        description: String,
        mimeType: String,
        name: String,
        url: String,
        size: {
          amount: String,
          units: String
        },
        validFor: {
          startDateTime: Date,
          endDateTime: Date
        },
        "@baseType": String,
        "@type": String,
        "@schemaLocation": String,
        "@referredType": String
      }
    ],
    configCharacteristics: [
      {
        _id:false,
        name: String,
        code: String,
        valueType: String,
        configCharacteristicsValues: [
          {}
        ]
      }
    ]
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
