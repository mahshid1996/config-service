const { values, result } = require('lodash');
const _ = require('lodash');
//Format JSON Object for the Patch Func
function patchFormateJSON(obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    for (let value of propNames) {
        const propName = value;
        if (typeof obj[propName] === 'object') {
            if (Array.isArray(obj[propName])) {
                if (obj[propName].length == 0) {
                    delete obj[propName];
                } else if (obj[propName].length > 0) {
                    for (element of obj[propName]) {
                        patchFormateJSON(element);
                    }
                }
            } else if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            } else {
                patchFormateJSON(obj[propName]);
            }
        } else if (typeof obj[propName] === 'string') {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            }
        } else {
            patchFormateJSON(obj[propName]);
        }
    }
    return obj;
}

//begin
//to Merge the objects if object is Mergeableobject
function isMergeableObject(val) {
    const nonNullObject = val && typeof val === 'object';

    return (
        nonNullObject &&
        Object.prototype.toString.call(val) !== '[object RegExp]' &&
        Object.prototype.toString.call(val) !== '[object Date]'
    );
}

//function to check object is type of Array or not
function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
}

//function to clone objects
function cloneIfNecessary(value, optionsArgument) {
    const clone = optionsArgument && optionsArgument.clone === true;
    return clone && isMergeableObject(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
}

//function to merge array
function defaultArrayMerge(target, source, optionsArgument) {
    const destination = target.slice();
    source.forEach(function (e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination;
}

//Function to merge source and target objects
function mergeObject(target, source, optionsArgument) {
    const destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination;
}

//Function to merge source and target objects
function deepmerge(target, source, optionsArgument) {
    const array = Array.isArray(source);
    const options = optionsArgument || { arrayMerge: defaultArrayMerge };
    const arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument);
    } else {
        return mergeObject(target, source, optionsArgument);
    }
}
//end

//to change keyNames in json object with spectial symbels
function iteratingObjectsAddSymbels(obj) {
    if (obj != null) {
        const propNames = Object.getOwnPropertyNames(obj);
        for (let value of propNames) {
            const propName = value;
            if (typeof obj[propName] === 'object') {
                if (Array.isArray(obj[propName])) {
                    for (let element of obj[propName]) {
                        replaceKeyWithSpecialSymble(element);
                    }
                } else {
                    replaceKeyWithSpecialSymble(obj[propName]);
                }
            } else {
                const key = propName;
                const value = obj[propName];
                addSymblesTokeyName(key, obj, value);
            }
        }
        return obj;
    }
}

function replaceKeyWithSpecialSymble(json) {
    const keys = Object.keys(json);
    for (let element of keys) {
        if (typeof json[element] === 'string') {
            const key = element;
            const value = json[key];
            addSymblesTokeyName(key, json, value);
        } else {
            iteratingObjectsAddSymbels(json[element]);
        }
    }

    return json;
}
function addSymble(key, json, value) {
    if (json.hasOwnProperty(key)) {
        delete json[key];
    }
    const newkey = `@${key}`;
    json[newkey] = value;
}

function addSymblesTokeyName(key, json, value) {
    switch (key) {
        case 'type':
        case 'baseType':
        case 'schemaLocation':
        case 'referredType':
            addSymble(key, json, value);
            break;
        default:
            break;
    }
}

//to change keyNames in json object without spectial symbels
function iteratingObjectsRemoveSymbels(obj) {
    if (obj != null) {
        const propNames = Object.getOwnPropertyNames(obj);
        for (let value of propNames) {
            const propName = value;
            if (typeof obj[propName] === 'object') {
                if (Array.isArray(obj[propName])) {
                    for (let element of obj[propName]) {
                        replaceKeyWithoutSpecailSymbels(element);
                    }
                } else {
                    replaceKeyWithoutSpecailSymbels(obj[propName]);
                }
            } else {
                const key = propName;
                const value = obj[propName];
                removeSymblesFromkeyName(key, obj, value);
            }
        }
        return obj;
    }
}
function replaceKeyWithoutSpecailSymbels(json) {
    //adding for ignore null value in GetByValue method
    if (json !== null) {
        const keys = Object.keys(json);
        for (let element of keys) {
            if (typeof json[element] === 'string') {
                const key = element;
                const value = json[key];
                removeSymblesFromkeyName(key, json, value);
            } else {
                iteratingObjectsRemoveSymbels(json[element]);
            }
        }
    }
    return json;
}

//adding '@' Symbel
function addingKeyWithoutSpecailSymbelsForParentAndChild(json) {
    let keys = Object.keys(json);
    const dataWithSymbles = ['type', 'baseType', 'schemaLocation', 'referredType'];
    const child_item = ['attachment', 'relatedParty', 'bundledResources'];

    //if there is resourceSchema field
    if (!_.isEmpty(json.resourceSchema) && keys.includes('resourceSchema')) {
        //storing data of resourceSchema properties to specify keys and values
        const dataOfProperties = json.resourceSchema.properties;

        const keysOfProperties = Object.keys(dataOfProperties);
        const valuesOfProperties = Object.values(dataOfProperties);

        //removing '@' from keys of resourceSchema properties
        for (let j = 0; j < keysOfProperties.length; j++) {
            if (dataWithSymbles.includes(keysOfProperties[j])) {
                const key = keysOfProperties[j];
                const value = valuesOfProperties[j];
                addSymblesTokeyName(key, dataOfProperties, value);
            }

            //each values of resourceSchema properties ,has separate keys and values
            if (child_item.includes(keysOfProperties[j]) && JSON.stringify(valuesOfProperties[j].items).includes('properties')) {
                let finalResult = '';
                let itemsOfProperties = JSON.stringify(valuesOfProperties[j].items).slice(
                    2,
                    JSON.stringify(valuesOfProperties[j].items).length - 2
                );

                itemsOfProperties = '{' + itemsOfProperties + '}';
                const finalItemsOfProperties = JSON.parse(itemsOfProperties);

                keys = Object.keys(finalItemsOfProperties);

                const indexOfPropertiesFieldInArray = keys.indexOf('properties');
                const indexOfRequiredFieldInArray = keys.indexOf('required');

                const values = Object.values(finalItemsOfProperties);
                const newPropertiesField = values[indexOfPropertiesFieldInArray];
                const key = Object.keys(newPropertiesField);
                const value = Object.values(newPropertiesField);

                for (let i = 0; i < key.length; i++) {
                    addSymblesTokeyName(key[i], newPropertiesField, value[i]);
                }

                if (!_.isEmpty(values[indexOfRequiredFieldInArray])) {
                    for (let k = 0; k < values[indexOfRequiredFieldInArray].length; k++) {
                        if (dataWithSymbles.includes(values[indexOfRequiredFieldInArray][k])) {
                            const res = values[indexOfRequiredFieldInArray][k].replace(
                                values[indexOfRequiredFieldInArray][k],
                                '@' + values[indexOfRequiredFieldInArray][k]
                            );
                            values[indexOfRequiredFieldInArray][k] = res;
                        }
                    }
                }
                let result = '';
                for (let i = 0; i < values.length; i++) {
                    result += JSON.stringify(keys[i]) + ':' + JSON.stringify(values[i]);
                    if (i !== values.length - 1) {
                        result += ',';
                    }
                }

                finalResult = '[{' + result + '}]';

                valuesOfProperties[j].items = JSON.parse(finalResult);
            }
        }
    }
    return json;
}
function removeSymble(key, json, value) {
    if (json.hasOwnProperty(key)) {
        delete json[key];
    }
    const newKey = key.slice(1);
    json[newKey] = value;
}

function removeSymblesFromkeyName(key, json, value) {
    switch (key) {
        case '@type':
        case '@baseType':
        case '@schemaLocation':
        case '@referredType':
            removeSymble(key, json, value);
            break;
        default:
            break;
    }
}
module.exports = {
    patchFormateJSON,
    deepmerge,
    replaceKeyWithSpecialSymble,
    replaceKeyWithoutSpecailSymbels,
    addingKeyWithoutSpecailSymbelsForParentAndChild
};
