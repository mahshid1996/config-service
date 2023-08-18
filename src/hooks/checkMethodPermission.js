const _ = require("lodash");
const logger = require("../logger");
const camelCase = require("camelcase");
const { BadRequest } = require("@feathersjs/errors");
const { checkPermission } = require('../../src/checkPermission.js');

// Function to check permission for the API method
async function checkMethodPermission(context) {

    // Skip permission check for the "login" path or when the context has a "provider" property
    if (context.path === "login" || context?.params?.provider === 'grpc') {
        return context;
    }


    // Get current date time
    const time = new Date();

    logger.applog("info", time, "Checking permission of API");

    // Extract authorization header, path, and method from context
    const {
        params: {
            headers: { authorization }
        },
        path,
        method
    } = context;

    // Get permission from the token
    const [, permission] = await checkPermission(authorization);

    logger.applog("info", time, `User permissions: ${JSON.stringify(permission)}`);

    try {
        // Define the base path for permissions
        const permissionPath = "drm.configService.api.";

        // Format and split the permissions
        const formattedPermissions = permission.split(",").map((permission) => formatString(permission));

        // Format the path and check permission
        const camelCasePath = camelCase(path);
        const newPath = camelCasePath.replace(/v\d\//, "");
        const newPermissionPath = formatString(`${permissionPath}${newPath}.${method}`);
        const newIsOK = formattedPermissions.includes(newPermissionPath);

        logger.applog("info", time, `Permission path: ${newPermissionPath}`);

        // Check permissions for the method
        if (!newIsOK) {
            throw new BadRequest(
                `User does not have the necessary permissions for ${method} method`
            );
        }

        logger.applog("info", time, "End of check-permission process");
        return context;
    } catch (error) {
        logger.applog("error", time, JSON.stringify(error));
        throw error;
    }
}

// Function to format a string by removing spaces and converting to lowercase
function formatString(string = "") {
    return string.replace(/\s/g, "").toLowerCase();
}

module.exports = {
    formatString,
    checkMethodPermission
};