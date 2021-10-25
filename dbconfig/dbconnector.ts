import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://root:123abnkakashi@localhost:5432/appota',
    idleTimeoutMillis: 30000
});