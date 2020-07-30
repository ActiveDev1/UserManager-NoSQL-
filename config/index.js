module.exports = {
    app: {
        port: parseInt(process.env.APP_PORT) || 3000,
    },
    db: {
        mysql: {
            HOST: process.env.MYSQL_HOST || 'localhost',
            USER: process.env.MYSQL_USER || 'root',
            PASSWORD: process.env.MYSQL_PASS || '',
            DB: process.env.MYSQL_DB || 'Nodedb',
        },
        mongodb: process.env.MONGODB_URI || 'mongodb://localhost:27017/NodeDB',
    },
}
