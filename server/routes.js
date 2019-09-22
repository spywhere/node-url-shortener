const express = require("express");

const generateLink = require("./controllers/generate-link");

module.exports = () => {
    const router = express.Router();

    router.post("/generate", generateLink);

    return router;
};
