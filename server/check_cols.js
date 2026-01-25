import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'ai_user',
    host: 'localhost',
    database: 'scholarship_finder',
    password: 'ai123',
    port: 5432,
});

async function run() {
    try {
        const res = await pool.query("SELECT * FROM scholarships LIMIT 1");
        console.log("SCHOLARSHIP_COLUMNS:");
        console.log(Object.keys(res.rows[0] || {}));
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

run();
