module.exports = {
    port: +(process.env.APP_PORT) || 3000,
    characterSet: (
        process.env.CHARSET ||
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    ),
    shortenMinimumLength: 6
};
