import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
    const db = await open({
        filename: './scholarship.db',
        driver: sqlite3.Database
    });

    const columns = await db.all("PRAGMA table_info(users)");
    console.log("Users Table Columns:", columns.map(c => c.name));

    // Check if education_level exists
    const hasEdu = columns.find(c => c.name === 'education_level');
    console.log("Has education_level:", !!hasEdu);
})();
