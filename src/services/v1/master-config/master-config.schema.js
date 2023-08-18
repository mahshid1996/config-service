
// Define the Feathers schema for service `masterConfig`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'MasterConfig',
  description: 'MasterConfig database.',
  // !end
  // !code: schema_definitions // !end

  // Required fields.
  required: [
    // !code: schema_required // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    id: {
      type: 'string'
    },
    href: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    '@type': {
      type: 'string'
    },
    '@baseType': {
      type: 'string'
    },
    batchStart: {
      type: 'string'
    },
    currentBatch: {
      type: 'string'
    },

    relatedParty: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          phone: {
            type: 'string'
          }
        },
      },
    },
    attachment: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          href: {
            type: 'string'
          },
          attachmentType: {
            type: 'string'
          },
          content: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          mimeType: {
            type: 'string'
          },
          name: {
            type: 'string'
          },
          url: {
            type: 'string'
          },
          size: {
            type: 'object',
            properties: {
              amount: {
                type: 'string'
              },
              units: {
                type: 'string'
              },
            },
          },
          validFor: {
            type: 'object',
            properties: {
              startDateTime: {
                type: 'string',
                format: 'date-time'
              },
              endDateTime: {
                type: 'string',
                format: 'date-time'
              },
            },
          },
          '@baseType': {
            type: 'string'
          },
          '@type': {
            type: 'string'
          },
          '@schemaLocation': {
            type: 'string'
          },
          '@referredType': {
            type: 'string'
          },
        },
      },
    },
    configCharacteristics: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          code: {
            type: 'string'
          },
          valueType: {
            type: 'string'
          },
          configCharacteristicsValues: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
            
              }
            }
          }
        },
      },
    },
    // !end
  },
  // !code: schema_more // !end
};

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: 'MasterConfig',
    service: {
      sort: { _id: 1 },
    },
    // sql: {
    //   sqlTable: 'MasterConfig',
    //   uniqueKey: '_id',
    //   sqlColumn: {
    //     __authorId__: '__author_id__',
    //   },
    // },
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !<DEFAULT> code: graphql_add
      // __author__: { type: '__User__!', args: false, relation: { ourTable: '__authorId__', otherTable: '_id' } },
      // !end
    },
    // !code: graphql_more // !end
  },
};

// !code: more // !end

let moduleExports = {
  schema,
  extensions,
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
