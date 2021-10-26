import { Pool } from 'pg';
require('dotenv').config()

export default new Pool ({
    max: 20,
    connectionString: `postgres://${process.env.DB_USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
    idleTimeoutMillis: 30000
});