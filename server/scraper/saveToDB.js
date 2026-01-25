import { pool } from "../db.js";

export async function saveScholarshipsToDB(list) {
  for (const s of list) {
    if (!s.name || s.name.trim() === "") continue;

    try {
      // In PostgreSQL, if the column is TEXT[], we might need to handle it differently, 
      // but if it's TEXT/JSON, stringify works. 
      // Based on previous view of schema.sql: category_allowed is TEXT[].
      // However, Node 'pg' driver can take JS arrays for TEXT[] columns.

      await pool.query(
        `
        INSERT INTO scholarships
        (name, income_limit, category_allowed, course_allowed, deadline)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (name) DO NOTHING
        `,
        [
          s.name,
          s.income_limit,
          s.category_allowed, // pg driver supports arrays -> TEXT[]
          s.course_allowed,   // pg driver supports arrays -> TEXT[]
          s.deadline ? new Date(s.deadline) : null,
        ],
      );
    } catch (err) {
      console.error(`Error saving scholarship ${s.name}:`, err.message);
    }
  }
}
