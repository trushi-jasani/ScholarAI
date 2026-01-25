import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
    const db = await open({
        filename: './scholarship.db',
        driver: sqlite3.Database
    });

    console.log('Adding UNIQUE index to scholarships(name)...');
    try {
        await db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_scholarships_name ON scholarships (name)`);
        console.log('Index created successfully.');
    } catch (e) {
        console.log('Index creation failed or already exists:', e.message);
    }
})();
