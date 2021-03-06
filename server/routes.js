const express = require("express");
const http = require("./common/http");

const generateLink = require("./controllers/generate-link");
const expandLink = require("./controllers/expand-link");

const promiseToMiddleware = (promise) => (request, response) => {
    promise(request).then((httpResponse) => {
        response.status(
            httpResponse.status || http.code.ok
        ).json(
            httpResponse.body
        );
    }).catch((error) => {
        response.status(
            http.code.serverError
        ).json({
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            }
        });
    });
};

module.exports = () => {
    const router = express.Router();

    router.post("/links", promiseToMiddleware(generateLink));
    router.get("/links/:linkID", promiseToMiddleware(expandLink));

    return router;
};
