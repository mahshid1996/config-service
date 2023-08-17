const { getItems, replaceItems } = require("feathers-hooks-common");
const logger = require("../logger");
const {
    schema: {
      properties: schema
    }
} = require("../../src/services/v1/master-config/master-config.schema.js");

/**
 * For assigning value to 'href' and '@schemaLocation' of schema
 */
async function shapePayload(context) {

    // Get current date time
    var t0 = new Date();

    if (context?.params?.url === undefined) {
        return context;
    }

    let items = getItems(context);
    const hasHref = !!schema.href;
    const hasSchemaLocation = !!schema["@schemaLocation"];
    const isProduction = process.env.NODE_ENV === "production";

    const shapeItem = async (item) => {
        let { href } = context.params.url;

        if (isProduction) href = `${href}`;

        item.href = hasHref ? `${href}${context.path}/${item._id}` : item.href;
        item["@schemaLocation"] = hasSchemaLocation
            ? `${href}schema/${context.path}`
            : item["@schemaLocation"];

        delete item.__v;

        return item;
    };

    if (Array.isArray(items)) {
        items = await Promise.all(items.map(async (item) => shapeItem(item)));
    } else {
        items = await shapeItem(items);
    }

    replaceItems(context, items);

    context?.result?.data && storeStatusGlobally(200);

    return context;
}

module.exports = {
    shapePayload,
};
