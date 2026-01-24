import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "*",
  host: "*",
  database: "*",
  password: "*",
  port: 0,
});

export async function scrapeScholarships() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = "https://www.buddy4study.com/scholarship/post-matric-scholarship-for-sc-st-obc-students-gujarat";
  await page.goto(url, { waitUntil: "networkidle2" });

  const html = await page.content();
  const $ = cheerio.load(html);

  // ---- Extract name ----
  const name = $("h1").first().text().trim();

  // ---- Extract full eligibility text ----
  const eligibilityText = $("div:contains('Eligibility')").parent().text();

  // ---- Parse fields from text ----
  const income_limit = extractIncome(eligibilityText);
  const category_allowed = extractCategory(eligibilityText);
  const course_allowed = extractCourse(eligibilityText);
  const deadline = extractDeadline($);

  // ---- Insert into DB ----
  const query = `
    INSERT INTO scholarships 
    (name, income_limit, category_allowed, course_allowed, deadline)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const values = [
    name,
    income_limit,
    category_allowed,
    course_allowed,
    deadline,
  ];

  const res = await pool.query(query, values);

  console.log("Inserted scholarship ID:", res.rows[0].id);

  await browser.close();
}

/* ---------------- HELPERS ---------------- */

function extractIncome(text) {
  const match = text.match(/income.*?(\d{1,3}[,\d{3}]+)/i);
  return match ? parseInt(match[1].replace(/,/g, "")) : null;
}

function extractCategory(text) {
  const categories = [];
  if (/sc/i.test(text)) categories.push("SC");
  if (/st/i.test(text)) categories.push("ST");
  if (/obc/i.test(text)) categories.push("OBC");
  if (categories.length === 0) categories.push("ALL");
  return categories;
}

function extractCourse(text) {
  const courses = [];
  if (/engineering/i.test(text)) courses.push("Engineering");
  if (/medical/i.test(text)) courses.push("Medical");
  if (/diploma/i.test(text)) courses.push("Diploma");
  if (courses.length === 0) courses.push("ALL");
  return courses;
}

function extractDeadline($) {
  const deadlineText = $("div:contains('Deadline'), div:contains('Last Date')").text();
  const match = deadlineText.match(/(\d{1,2}\s\w+\s\d{4})/);
  return match ? new Date(match[1]) : null;
}

// run
scrapeScholarships();