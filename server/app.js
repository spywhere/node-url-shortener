const express = require("express");
const bodyPaser = require("body-parser");
const helmet = require("helmet");

const logger = require("./common/logger");
const http = require("./common/http");
const config = require("./common/config")("app");

const app = express();

app.use(helmet());
app.use(bodyPaser.json());

app.use((request, response) => response.status(http.code.notFound).send());

app.listen(config.port, () => {
    logger.info(`Server listened on port ${ config.port }`);
});
