import * as pg from 'pg'
const { Pool } = pg
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});

module.exports = { pool: pool };