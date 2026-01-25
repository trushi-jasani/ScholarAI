import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
  const db = await open({
    filename: './scholarship.db',
    driver: sqlite3.Database
  });

  console.log('Creating tables...');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      income INTEGER,
      category TEXT,
      course TEXT,
      state TEXT,
      education_level TEXT,
      gpa REAL
    );

    CREATE TABLE IF NOT EXISTS scholarships (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      income_limit INTEGER,
      category_allowed TEXT, -- Stored as JSON string
      course_allowed TEXT,   -- Stored as JSON string
      deadline TEXT,
      link TEXT
    );

    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id),
      scholarship_id INTEGER REFERENCES scholarships(id),
      status TEXT,
      sop_content TEXT
    );
  `);

  console.log('Seeding data...');

  // Check if scholarships exist
  const existing = await db.get("SELECT count(*) as count FROM scholarships");

  if (existing.count === 0) {
    await db.run(`INSERT INTO scholarships (name, income_limit, category_allowed, course_allowed, deadline) VALUES 
      ('MYSY Scholarship', 300000, '["General","OBC","SC","ST"]', '["Engineering"]', '2026-09-15'),
      ('Reliance Foundation UG', 250000, '["General","OBC"]', '["Engineering","Medicine"]', '2026-08-30'),
      ('NSDL Shiksha Sahyog', 300000, '["SC","ST","OBC"]', '["Engineering","Commerce"]', '2026-07-20')
      `);
  }

  console.log('Database initialized successfully.');
})();
