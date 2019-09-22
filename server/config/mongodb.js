module.exports = {
    "mongodb-host": process.env.MONGODB_HOST || "mongodb://127.0.0.1:27017",
    "database-name": process.env.MONGODB_DBNAME || "url_shortener",

    // MongoDB Options
    useNewUrlParser: true
};
