const PORT = process.env.PORT || 8000;

module.exports = {
    BaseUrl: `http://localhost:${PORT}`,
    MONGO_URL: 'mongodb://127.0.0.1:27017/presta4youDB'
}