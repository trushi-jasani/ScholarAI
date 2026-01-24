import express from "express";
import { updateScholarships } from "../scraper/saveToDB.js";

const router = express.Router();

router.get("/scrape", async (req, res) => {
  try {
    const count = await updateScholarships();
    res.json({
      success: true,
      inserted: count,
      message: "Scholarships scraped and saved"
    });
  } catch (err) {
    console.error("SCRAPE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
