const config = require("../common/config")("app");

function generateAlias(characterSet, length) {
    return new Array(length).fill(true).map(
        () => characterSet[
            Math.floor(Math.random() * characterSet.length)
        ]
    ).join("");
}

module.exports = (request, response) => {
    const {
        url, alias: requestedAlias
    } = request.body || {};

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
            response.status(400).json({
                message: "Alias is not in a valid format"
            });
            return;
        }

        if (alias.length < config.shortenMinimumLength) {
            response.status(400).json({
                message: `Alias is too short (minimum of ${
                    config.shortenMinimumLength
                })`
            });
            return;
        }
    }

    // This would take a lot of time if we have a lot of URLs stored in the
    //   datasource
    while (true) {
        // Check for existing alias
        const existingAlias = false;

        if (requestedAlias && existingAlias) {
            // Alias collided, reject since it's a provided alias
            response.status(400).json({
                message: `Alias "${
                    requestedAlias
                }" is unavailable, please try another one.`
            });
            return;
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

    response.status(201).json({
        url,
        alias
    });
};
