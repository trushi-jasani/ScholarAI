import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body;

  res.json({
    outline: [
      "Introduction and background",
      "Academic achievements",
      "Financial need",
      "Career goals",
      "Why this scholarship matters"
    ],
    tip: `Keep it honest and structured, ${name}`
  });
});

export default router;
