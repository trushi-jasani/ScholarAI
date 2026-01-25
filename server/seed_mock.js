import { pool } from "./db.js";

const mockData = [
    { name: "MYSY Scholarship", income_limit: 600000, category_allowed: ["General", "OBC", "SC", "ST"], course_allowed: ["Engineering", "Medicine"], deadline: "2026-10-15" },
    { name: "Digital Gujarat SC/ST Scholarship", income_limit: 250000, category_allowed: ["SC", "ST"], course_allowed: ["All"], deadline: "2026-09-30" },
    { name: "HDFC Badhte Kadam", income_limit: 600000, category_allowed: ["General", "OBC", "SC", "ST"], course_allowed: ["All"], deadline: "2026-08-15" },
    { name: "Reliance Foundation Undergraduate", income_limit: 250000, category_allowed: ["General", "OBC", "SC", "ST"], course_allowed: ["Engineering", "Science"], deadline: "2026-09-05" },
    { name: "Tata Capital Pankh", income_limit: 400000, category_allowed: ["General", "OBC"], course_allowed: ["Undergraduate", "Engineering"], deadline: "2026-08-31" },
    { name: "Keep India Smiling Foundational", income_limit: 500000, category_allowed: ["General", "OBC", "SC", "ST"], course_allowed: ["Dental", "Engineering"], deadline: "2026-12-31" },
    { name: "Vidyasaarathi Scholarship", income_limit: 800000, category_allowed: ["General"], course_allowed: ["Engineering"], deadline: "2026-07-20" },
    { name: "Aditya Birla Capital Scholarship", income_limit: 600000, category_allowed: ["General", "OBC"], course_allowed: ["Undergraduate"], deadline: "2026-10-10" },
    { name: "OakNorth STEM Scholarship", income_limit: 300000, category_allowed: ["Female"], course_allowed: ["STEM", "Engineering"], deadline: "2026-09-01" },
    { name: "PM YASASVI Scheme", income_limit: 250000, category_allowed: ["OBC", "EBC", "DNT"], course_allowed: ["School"], deadline: "2026-08-10" }
];

(async () => {
    console.log("Seeding mock data...");
    for (const s of mockData) {
        try {
            await pool.query(
                `INSERT INTO scholarships (name, income_limit, category_allowed, course_allowed, deadline)
               VALUES ($1, $2, $3, $4, $5)
               ON CONFLICT(name) DO NOTHING`,
                [
                    s.name,
                    s.income_limit,
                    JSON.stringify(s.category_allowed),
                    JSON.stringify(s.course_allowed),
                    new Date(s.deadline)
                ]
            );
        } catch (e) {
            console.error("Failed to insert", s.name, e.message);
        }
    }
    console.log("Seeding complete.");
})();
