module.exports = {
    port: +(process.env.APP_PORT) || 8080,
    api: process.env.API_HOST || "http://0.0.0.0:3000"
};
