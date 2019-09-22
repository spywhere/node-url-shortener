const got = require("got");

const http = require("../common/http");
const config = require("../common/config")("app");

module.exports = (request, response) => {
    const {
        linkID
    } = request.params;

    got(`${
        config.api
    }/links/${ linkID }`).then((httpResponse) => {
        let body = {};

        try {
            body = JSON.parse(httpResponse.body);
        } catch (error) {
            // Fallback to empty object
        }
        if (
            !body.url
        ) {
            response.status(
                http.code.notFound
            ).render("404");
            return;
        }

        response.redirect(body.url);
        return;
    }).catch((error) => {
        response.status(
            http.code.serverError
        ).render("500", {
            error: error.name,
            message: error.message
        });
        return;
    });
};
