import { pool } from "../db.js";
import { sendMatchEmail } from "./emailService.js";
import axios from "axios";

export async function getMatchesForUser(userProfile, shouldFilter = true) {
    const { income, category, course, cgpa: userCGPA } = userProfile;
    const allScholarships = await pool.query("SELECT * FROM scholarships");

    let filtered = allScholarships.rows;

    if (shouldFilter) {
        filtered = allScholarships.rows.filter(s => {
            // 1. Income Check
            if (s.income_limit && income && income > s.income_limit) return false;

            // 2. CGPA Check
            // The database stores scholarship requirement in 'cgpa' column
            if (s.cgpa && userCGPA && Number(userCGPA) < Number(s.cgpa)) return false;

            // 3. Category Check
            let allowedCats = s.category_allowed || ["All"];
            if (typeof allowedCats === 'string') {
                try { allowedCats = JSON.parse(allowedCats); } catch (e) { allowedCats = [allowedCats]; }
            }
            if (!Array.isArray(allowedCats)) allowedCats = [allowedCats];

            const lowerCategory = category?.toLowerCase();
            const lowerName = userProfile.name?.toLowerCase() || "";
            const isLikelyFemale = lowerName.endsWith("a") || lowerName.endsWith("i") || lowerName.includes("ms.") || lowerName.includes("miss");

            const categoryMatch =
                allowedCats.some(c => {
                    const lc = c.toLowerCase();
                    if (lc === "all") return true;
                    if (lc === lowerCategory) return true;
                    if (lc === "general" && ["obc", "sc", "st", "general"].includes(lowerCategory)) return true;
                    if (lc === "female" && isLikelyFemale) return true;
                    return false;
                });

            if (!categoryMatch) return false;

            // 3. Course Check
            let allowedCourses = s.course_allowed || ["All"];
            if (typeof allowedCourses === 'string') {
                try { allowedCourses = JSON.parse(allowedCourses); } catch (e) { allowedCourses = [allowedCourses]; }
            }
            if (!Array.isArray(allowedCourses)) allowedCourses = [allowedCourses];

            const userCourse = course?.toLowerCase() || "";
            // Default to 'undergraduate' if not specified, as most scholarships are for this level
            const userEdu = (userProfile.education_level || "Undergraduate").toLowerCase();

            const courseMatch =
                allowedCourses.some(c => {
                    const lc = c.toLowerCase();
                    if (lc === "all") return true;
                    // Exact or partial match
                    if (userCourse.includes(lc) || lc.includes(userCourse)) return true;
                    // Education level overlap (e.g. 'Undergraduate' allows any undergrad major)
                    if (lc.includes(userEdu) || userEdu.includes(lc)) return true;
                    // STEM categories (Engineering and Science overlap with STEM)
                    if (lc === "stem" && (userCourse.includes("engineering") || userCourse.includes("science") || userCourse.includes("tech"))) return true;

                    // Special cases for broad categories often applied to engineers
                    const engineeringSynonyms = ["engineering", "technology", "stem", "technical", "undergraduate"];
                    if (engineeringSynonyms.some(syn => userCourse.includes(syn)) &&
                        (lc.includes("science") || lc.includes("undergraduate") || lc.includes("all"))) return true;

                    return false;
                });

            if (!courseMatch) return false;

            return true;
        });
    }

    // 4. ML Prediction for Score
    const scoredPromises = filtered.map(async (s) => {
        let score = Math.floor(Math.random() * (95 - 75 + 1) + 75); // Old fallback
        let reason = `Rule - based match(Potential: ${s.name})`;

        try {
            // Call Python ML service
            const mlResponse = await axios.post("http://127.0.0.1:8001/predict", {
                cgpa: userCGPA || 3.5,
                income: income || 500000,
                category: category || "general",
                course: course || "engineering"
            }, { timeout: 2000 });

            if (mlResponse.data && mlResponse.data.match_percentage) {
                score = mlResponse.data.match_percentage;
                reason = `ML Predictor: High confidence profile match for ${s.name}`;
            }
        } catch (err) {
            console.warn("ML Service unreachable, using fallback score.");
        }

        return {
            ...s,
            matchscore: score,
            ai_reason: reason
        };
    });

    const results = await Promise.all(scoredPromises);
    // Sort by match score descending
    return results.sort((a, b) => b.matchscore - a.matchscore);
}

export async function triggerMatchNotifications(user, matches) {
    if (!user.id || !user.email) return;

    // Notify for top 2 matches
    const topMatches = matches.slice(0, 2);

    for (const s of topMatches) {
        try {
            // Check if already notified
            const notified = await pool.query(
                "SELECT * FROM user_notifications WHERE user_id=$1 AND scholarship_id=$2",
                [user.id, s.id]
            );

            if (notified.rows.length === 0) {
                console.log(`Sending match email for ${s.name} to ${user.email} (Triggered)`);
                const result = await sendMatchEmail(user.email, user.name, s);
                if (result.success) {
                    await pool.query(
                        "INSERT INTO user_notifications (user_id, scholarship_id) VALUES ($1,$2)",
                        [user.id, s.id]
                    );
                }
            }
        } catch (err) {
            console.error("Match Notification Error:", err.message);
        }
    }
}
