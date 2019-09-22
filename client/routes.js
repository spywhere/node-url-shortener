const express = require("express");
const config = require("./common/config")("app");

const redirectLink = require("./controllers/redirect-link");

function render(page, data) {
    return (request, response) => response.render(
        page,
        typeof(data) === "function" ? data(request) : data
    );
}

module.exports = () => {
    const router = express.Router();

    router.get("/", render("index", (request) => ({
        host: `${ request.protocol }://${ request.hostname }${
            config.port === 80 ? "" : `:${ config.port }`
        }`
    })));

    router.get("/:linkID", redirectLink);

    return router;
};
