const express = require("express");
const helmet = require("helmet");

const logger = require("./common/logger");
const http = require("./common/http");
const config = require("./common/config")("app");

const routes = require("./routes");

const app = express();

app.use(helmet());

app.set("view engine", "pug");

app.use(express.static("public"));
app.use(routes());

app.use((request, response) => response.status(
    http.code.notFound
).render("404"));

app.listen(config.port, () => {
    logger.info(`Server listened on port ${ config.port }`);
});
