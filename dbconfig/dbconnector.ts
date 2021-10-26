import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
    idleTimeoutMillis: 30000
});