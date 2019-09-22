const mongodb = require("mongodb");
const config = require("../common/config");

function normalizeObject(object) {
    if (
        typeof(object) !== "object" ||
        Array.isArray(object) ||
        object === null
    ) {
        return object;
    }

    return Object.keys(object).reduce((newObject, key) => {
        if (object[key] === undefined) {
            return newObject;
        }

        return {
            ...newObject,
            [key]: object[key]
        };
    }, {});
}

async function executeQuery(collection, method, ...args) {
    const queries = args;

    return collection[method](
        ...queries.map(normalizeObject)
    );
}

module.exports = {
    toID: (value) => mongodb.ObjectID(value),
    perform: async(query) => {
        const {
            "mongodb-host": mongodbHost,
            "database-name": databaseName,
            ...options
        } = config("mongodb");

        const client = await mongodb.connect(
            mongodbHost, options
        );

        const database = client.db(databaseName);

        const {
            collection: collectionName
        } = query;

        const collection = database.collection(collectionName);

        const method = [
            "findOne", "insertOne"
        ].find(
            (methodName) => !!query[methodName]
        );

        if (!method) {
            return undefined;
        }

        const results = await executeQuery(
            collection, method, query[method]
        );

        client.close();

        return results;
    }
};
