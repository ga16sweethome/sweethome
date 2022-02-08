require("dotenv").config();
module.exports = {
    development: {
        username: "root",
        password: "ventrinet",
        database: "sweet",
        host: "localhost",
        dialect: "mysql",
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "postgres",
    },
    production: {
        use_env_variable: process.env.DATABASE_URL,
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
        },
    },
    };
