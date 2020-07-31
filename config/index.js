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
        mongodb: {
            HOST: process.env.MONGO_HOST || 'localhost',
            PORT:process.env.MONGO_PORT ||  27017,
            DB: process.env.MONGO_DB ||'NodeDB',
        },
    },
}
