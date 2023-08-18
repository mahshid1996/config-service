
/* eslint quotes: 0 */
// Defines the MongoDB $jsonSchema for service `masterConfig`. (Can be re-generated.)
const merge = require('lodash.merge');
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !<DEFAULT> code: model
  {
    bsonType: "object",
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: "objectId"
      },
      href: {
        bsonType: "string"
      },
      name: {
        bsonType: "string"
      },
      description: {
        bsonType: "string"
      },
      code: {
        bsonType: "string"
      },
      "@type": {
        bsonType: "string"
      },
      "@baseType": {
        bsonType: "string"
      },
      batchStart: {
        bsonType: "string"
      },
      currentBatch: {
        bsonType: "string"
      },
      relatedParty: {
        items: {
          type: "object",
          properties: {
            name: {
              type: "string"
            },
            email: {
              type: "string"
            },
            phone: {
              type: "string"
            }
          }
        },
        bsonType: "array"
      },
      attachment: {
        items: {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            href: {
              type: "string"
            },
            attachmentType: {
              type: "string"
            },
            content: {
              type: "string"
            },
            description: {
              type: "string"
            },
            mimeType: {
              type: "string"
            },
            name: {
              type: "string"
            },
            url: {
              type: "string"
            },
            size: {
              type: "object",
              properties: {
                amount: {
                  type: "string"
                },
                units: {
                  type: "string"
                }
              }
            },
            validFor: {
              type: "object",
              properties: {
                startDateTime: {
                  type: "string",
                  format: "date-time"
                },
                endDateTime: {
                  type: "string",
                  format: "date-time"
                }
              }
            },
            "@baseType": {
              type: "string"
            },
            "@type": {
              type: "string"
            },
            "@schemaLocation": {
              type: "string"
            },
            "@referredType": {
              type: "string"
            }
          }
        },
        bsonType: "array"
      },
      configCharacteristics: {
        items: {
          type: "object",
          properties: {
            name: {
              type: "string"
            },
            code: {
              type: "string"
            },
            valueType: {
              type: "string"
            },
            configCharacteristicsValues: {
              type: "array",
              items: {
                type: "object",
                properties: {}
              }
            }
          }
        },
        bsonType: "array"
      }
    }
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
