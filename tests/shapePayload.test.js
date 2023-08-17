const { expect } = require('chai');
const { getItems, replaceItems } = require('feathers-hooks-common');
const { stub } = require('sinon');

const {shapePayload} = require('../src/hooks/shapePayload.js');

 describe('UT for shapePayload', () => {
  it('shapePayload', async () => {
    const context = {
        "type": "after",
        "arguments": [
            {
                "name": "FTP_config",
                "description": "FTP_config",
                "status": "Active",
                "@type": "MSISDN",
                "@baseType": "logical-resource",
                "configCharacteristics": [
                    {
                        "configCharacteristicsValues": [
                            {
                                "value": "FTP",
                                "valueType": "string"
                            }
                        ],
                        "code": "remote server type",
                        "name": "Remote Server Type",
                        "valueType": "string"
                    },
                    {
                        "configCharacteristicsValues": [
                            {
                                "value": "127.0.0.1",
                                "valueType": "string"
                            }
                        ],
                        "code": "remote server address",
                        "name": "Remote Server Addresss",
                        "valueType": "string"
                    },
                    {
                        "configCharacteristicsValues": [
                            {
                                "value": 21,
                                "valueType": "integer"
                            }
                        ],
                        "code": "remote server port",
                        "name": "Remote Server Port",
                        "valueType": "integer"
                    },
                    {
                        "configCharacteristicsValues": [
                            {
                                "value": "/home/ftp/input",
                                "valueType": "string"
                            }
                        ],
                        "code": "remote server input path",
                        "name": "Remote Server Input Path",
                        "valueType": "string"
                    },
                    {
                        "configCharacteristicsValues": [
                            {
                                "value": "/home/ftp_client/inp/ali",
                                "valueType": "string"
                            }
                        ],
                        "code": "remote server output path",
                        "name": "Remote Server Output Path",
                        "valueType": "string"
                    },
                    {
                        "configCharacteristicsValues": [
                            {
                                "value": "test",
                                "valueType": "string"
                            }
                        ],
                        "code": "username",
                        "name": "Username",
                        "valueType": "string"
                    },
                    {
                        "configCharacteristicsValues": [
                            {
                                "value": "1234",
                                "valueType": "string"
                            }
                        ],
                        "code": "password",
                        "name": "Password",
                        "valueType": "string"
                    },
                    {
                        "configCharacteristicsValues": [
                            {
                                "value": {
                                    "code": "name",
                                    "value": "mahshid",
                                    "valueType": "string"
                                },
                                "valueType": "object"
                            },
                            {
                                "value": {
                                    "code": "phone",
                                    "value": "123456789",
                                    "valueType": "string"
                                },
                                "valueType": "object"
                            },
                            {
                                "value": {
                                    "code": "email",
                                    "value": "mahshid@gmail.com",
                                    "valueType": "string"
                                },
                                "valueType": "object"
                            }
                        ],
                        "code": "contact",
                        "name": "Contact Person",
                        "valueType": "object"
                    }
                ],
                "relatedParty": [
                    {
                        "name": "drmuser",
                        "email": "",
                        "phone": ""
                    }
                ],
                "attachment": []
            },
            {
                "query": {},
                "route": {},
                "provider": "rest",
                "headers": {
                    "content-type": "application/json",
                    "user-agent": "PostmanRuntime/7.32.3",
                    "accept": "*/*",
                    "postman-token": "4bc30d1f-ce73-4b52-8eb4-237b29609e9e",
                    "host": "localhost:3030",
                    "accept-encoding": "gzip, deflate, br",
                    "connection": "keep-alive",
                    "content-length": "3634"
                },
                "url": {
                    "slashes": true,
                    "protocol": "http:",
                    "hash": "",
                    "query": "",
                    "pathname": "/",
                    "auth": "",
                    "host": "localhost:3030",
                    "port": "3030",
                    "hostname": "localhost",
                    "password": "",
                    "username": "",
                    "origin": "http://localhost:3030",
                    "href": "http://localhost:3030/"
                }
            }
        ],
        "service": {
            "discriminatorKey": "__t",
            "discriminators": {},
            "id": "_id",
            "paginate": {
                "default": 10,
                "max": 100
            },
            "lean": true,
            "overwrite": true,
            "events": [],
            "useEstimatedDocumentCount": false,
            "methods": {
                "find": [
                    "params"
                ],
                "get": [
                    "id",
                    "params"
                ],
                "create": [
                    "data",
                    "params"
                ],
                "update": [
                    "id",
                    "data",
                    "params"
                ],
                "patch": [
                    "id",
                    "data",
                    "params"
                ],
                "remove": [
                    "id",
                    "params"
                ]
            },
            "_events": {},
            "_eventsCount": 4,
            "docs": {
                "operations": {}
            }
        },
        "method": "create",
        "path": "v1/master-config",
        "data": {
            "name": "FTP_config",
            "description": "FTP_config",
            "status": "Active",
            "@type": "MSISDN",
            "@baseType": "logical-resource",
            "configCharacteristics": [
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "FTP",
                            "valueType": "string"
                        }
                    ],
                    "code": "remote server type",
                    "name": "Remote Server Type",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "127.0.0.1",
                            "valueType": "string"
                        }
                    ],
                    "code": "remote server address",
                    "name": "Remote Server Addresss",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": 21,
                            "valueType": "integer"
                        }
                    ],
                    "code": "remote server port",
                    "name": "Remote Server Port",
                    "valueType": "integer"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "/home/ftp/input",
                            "valueType": "string"
                        }
                    ],
                    "code": "remote server input path",
                    "name": "Remote Server Input Path",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "/home/ftp_client/inp/ali",
                            "valueType": "string"
                        }
                    ],
                    "code": "remote server output path",
                    "name": "Remote Server Output Path",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "test",
                            "valueType": "string"
                        }
                    ],
                    "code": "username",
                    "name": "Username",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "1234",
                            "valueType": "string"
                        }
                    ],
                    "code": "password",
                    "name": "Password",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": {
                                "code": "name",
                                "value": "mahshid",
                                "valueType": "string"
                            },
                            "valueType": "object"
                        },
                        {
                            "value": {
                                "code": "phone",
                                "value": "123456789",
                                "valueType": "string"
                            },
                            "valueType": "object"
                        },
                        {
                            "value": {
                                "code": "email",
                                "value": "mahshid@gmail.com",
                                "valueType": "string"
                            },
                            "valueType": "object"
                        }
                    ],
                    "code": "contact",
                    "name": "Contact Person",
                    "valueType": "object"
                }
            ],
            "relatedParty": [
                {
                    "name": "drmuser",
                    "email": "",
                    "phone": ""
                }
            ],
            "attachment": []
        },
        "params": {
            "query": {},
            "route": {},
            "provider": "rest",
            "headers": {
                "content-type": "application/json",
                "user-agent": "PostmanRuntime/7.32.3",
                "accept": "*/*",
                "postman-token": "4bc30d1f-ce73-4b52-8eb4-237b29609e9e",
                "host": "localhost:3030",
                "accept-encoding": "gzip, deflate, br",
                "connection": "keep-alive",
                "content-length": "3634"
            },
            "url": {
                "slashes": true,
                "protocol": "http:",
                "hash": "",
                "query": "",
                "pathname": "/",
                "auth": "",
                "host": "localhost:3030",
                "port": "3030",
                "hostname": "localhost",
                "password": "",
                "username": "",
                "origin": "http://localhost:3030",
                "href": "http://localhost:3030/"
            }
        },
        "result": {
            "_id": "64de0e27fc864aa8484fa787",
            "name": "FTP_config",
            "description": "FTP_config",
            "status": "Active",
            "@type": "MSISDN",
            "@baseType": "logical-resource",
            "configCharacteristics": [
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "FTP",
                            "valueType": "string"
                        }
                    ],
                    "code": "remote server type",
                    "name": "Remote Server Type",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "127.0.0.1",
                            "valueType": "string"
                        }
                    ],
                    "code": "remote server address",
                    "name": "Remote Server Addresss",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": 21,
                            "valueType": "integer"
                        }
                    ],
                    "code": "remote server port",
                    "name": "Remote Server Port",
                    "valueType": "integer"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "/home/ftp/input",
                            "valueType": "string"
                        }
                    ],
                    "code": "remote server input path",
                    "name": "Remote Server Input Path",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "/home/ftp_client/inp/ali",
                            "valueType": "string"
                        }
                    ],
                    "code": "remote server output path",
                    "name": "Remote Server Output Path",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "test",
                            "valueType": "string"
                        }
                    ],
                    "code": "username",
                    "name": "Username",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": "1234",
                            "valueType": "string"
                        }
                    ],
                    "code": "password",
                    "name": "Password",
                    "valueType": "string"
                },
                {
                    "configCharacteristicsValues": [
                        {
                            "value": {
                                "code": "name",
                                "value": "mahshid",
                                "valueType": "string"
                            },
                            "valueType": "object"
                        },
                        {
                            "value": {
                                "code": "phone",
                                "value": "123456789",
                                "valueType": "string"
                            },
                            "valueType": "object"
                        },
                        {
                            "value": {
                                "code": "email",
                                "value": "mahshid@gmail.com",
                                "valueType": "string"
                            },
                            "valueType": "object"
                        }
                    ],
                    "code": "contact",
                    "name": "Contact Person",
                    "valueType": "object"
                }
            ],
            "relatedParty": [
                {
                    "name": "drmuser",
                    "email": "",
                    "phone": ""
                }
            ],
            "attachment": [],
            "createdAt": "2023-08-17T12:10:15.877Z",
            "updatedAt": "2023-08-17T12:10:15.877Z",
            "code": "CF2",
            "version": 0
        }
    };

    const result =  await shapePayload(context);
    //const result = await shapePayload(context);
  });


  
});
