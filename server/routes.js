const express = require("express");
const http = require("./common/http");

const generateLink = require("./controllers/generate-link");

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

    router.post("/generate", promiseToMiddleware(generateLink));

    return router;
};
