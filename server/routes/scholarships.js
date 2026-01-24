import express from "express";
import { pool } from "../db.js";
import { explainScholarship } from "../ai/llm.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { income, category, course } = req.body;

  const result = await pool.query(
    `SELECT *,
      (CASE WHEN income_limit >= $1 THEN 40 ELSE 0 END +
       CASE WHEN $2 = ANY(category_allowed) THEN 30 ELSE 0 END +
       CASE WHEN $3 = ANY(course_allowed) THEN 30 ELSE 0 END) AS matchscore
     FROM scholarships
     WHERE income_limit >= $1
     AND $2 = ANY(category_allowed)
     AND $3 = ANY(course_allowed)`,
    [income, category, course]
  );

  const aiResults = await Promise.all(
    result.rows.map(async s => ({
      ...s,
      ai_reason: await explainScholarship(
        { income, category, course },
        s
      )
    }))
  );

  res.json(aiResults);
});

export default router;
