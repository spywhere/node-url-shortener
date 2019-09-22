const mongodb = require("../lib/mongodb");

module.exports = async(request) => {
    const {
        linkID
    } = request.params;

    const record = await mongodb.perform({
        collection: "link",
        findOne: {
            alias: linkID
        }
    });

    if (!record) {
        return {
            status: 404
        };
    }

    return {
        status: 200,
        body: {
            alias: record.alias,
            url: record.url
        }
    };
};
