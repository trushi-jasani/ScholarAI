import { pool } from "../db.js";
import { scrapeScholarships } from "./scholarshipsScraper.js";

export async function updateScholarships() {
  const scholarships = await scrapeScholarships();

  for (const s of scholarships) {
    await pool.query(
      `INSERT INTO scholarships
       (name, income_limit, category_allowed, course_allowed, deadline)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        s.name,
        s.income_limit,
        s.category_allowed,
        s.course_allowed,
        s.deadline
      ]
    );
  }

  return scholarships.length;
}
