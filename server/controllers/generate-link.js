const config = require("../common/config")("app");
const mongodb = require("../lib/mongodb");
const validUrl = require("valid-url");

function generateAlias(characterSet, length) {
    return new Array(length).fill(true).map(
        () => characterSet[
            Math.floor(Math.random() * characterSet.length)
        ]
    ).join("");
}

module.exports = async(request) => {
    const {
        url, alias: requestedAlias
    } = request.body || {};

    if (!validUrl.isUri(url)) {
        return {
            status: 400,
            body: {
                message: "URL is not in a valid format"
            }
        };
    }

    let alias = requestedAlias || generateAlias(
        config.characterSet,
        config.shortenMinimumLength
    );

    // If alias is provided, validate it first
    if (alias) {
        if (
            !new RegExp(`^[${
                config.characterSet
            }]+$`, "g").test(alias)
        ) {
            return {
                status: 400,
                body: {
                    message: "Alias is not in a valid format"
                }
            };
        }

        if (alias.length < config.shortenMinimumLength) {
            return {
                status: 400,
                body: {
                    message: `Alias is too short (minimum of ${
                        config.shortenMinimumLength
                    })`
                }
            };
        }
    }

    // This would take a lot of time if we have a lot of URLs stored in the
    //   datasource
    while (true) {
        // Check for existing alias
        const existingAlias = await mongodb.perform({
            collection: "link",
            findOne: {
                alias
            }
        });

        if (requestedAlias && existingAlias) {
            // Alias collided, reject since it's a provided alias
            return {
                status: 400,
                body: {
                    message: `Alias "${
                        requestedAlias
                    }" is unavailable, please try another one.`
                }
            };
        } else if (existingAlias) {
            // Alias collided, regenerate a new one
            alias = generateAlias(
                config.characterSet,
                config.shortenMinimumLength
            );
        } else {
            // Alias is available
            break;
        }
    }

    await mongodb.perform({
        collection: "link",
        insertOne: {
            url,
            alias
        }
    });

    return {
        status: 201,
        body: {
            url,
            alias
        }
    };
};
