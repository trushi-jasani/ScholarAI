import express from "express";
import { pool } from "../db.js";
import { generateSOP } from "../ai/llm.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { userId, scholarshipId } = req.body;

  const user = (await pool.query(
    "SELECT * FROM users WHERE id=$1",
    [userId]
  )).rows[0];

  const scholarship = (await pool.query(
    "SELECT * FROM scholarships WHERE id=$1",
    [scholarshipId]
  )).rows[0];

  const sop = await generateSOP(user, scholarship);

  res.json({ sop });
});

export default router;
