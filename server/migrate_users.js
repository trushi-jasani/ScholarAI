import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
    const db = await open({
        filename: './scholarship.db',
        driver: sqlite3.Database
    });

    console.log("Adding missing columns to users table...");
    try {
        await db.run("ALTER TABLE users ADD COLUMN education_level TEXT");
        console.log("Added education_level");
    } catch (e) {
        console.log("education_level already exists or error:", e.message);
    }

    try {
        await db.run("ALTER TABLE users ADD COLUMN gpa REAL");
        console.log("Added gpa");
    } catch (e) {
        console.log("gpa already exists or error:", e.message);
    }

    console.log("Migration complete.");
})();
