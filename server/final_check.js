import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'ai_user',
    host: 'localhost',
    database: 'scholarship_finder',
    password: 'ai123',
    port: 5432,
});

async function run() {
    try {
        const userResult = await pool.query("SELECT * FROM users WHERE email='parita@test.com'");
        const user = userResult.rows[0];
        console.log("USER_PROFILE:", JSON.stringify(user, null, 2));

        const scholarships = await pool.query("SELECT * FROM scholarships ORDER BY id");
        console.log("\nANALYSIS:");

        scholarships.rows.forEach(s => {
            const reasons = [];
            const { income, category, course, cgpa: userCGPA, education_level } = user;

            // 1. Income Check
            if (s.income_limit && income && Number(income) > Number(s.income_limit)) {
                reasons.push(`Income ${income} > ${s.income_limit}`);
            }

            // 2. CGPA Check
            if (s.cgpa && userCGPA && Number(userCGPA) < Number(s.cgpa)) {
                reasons.push(`CGPA ${userCGPA} < ${s.cgpa}`);
            }

            // 3. Category Check
            let allowedCats = s.category_allowed || ["All"];
            const lowerCategory = category?.toLowerCase();
            const lowerName = user.name?.toLowerCase() || "";
            const isLikelyFemale = lowerName.endsWith("a") || lowerName.endsWith("i") || lowerName.includes("ms.") || lowerName.includes("miss");

            const categoryMatch = allowedCats.some(c => {
                const lc = c.toLowerCase();
                if (lc === "all") return true;
                if (lc === lowerCategory) return true;
                if (lc === "general" && ["obc", "sc", "st", "general"].includes(lowerCategory)) return true;
                if (lc === "female" && isLikelyFemale) return true;
                return false;
            });
            if (!categoryMatch) reasons.push(`Category ${category} not in [${allowedCats.join(", ")}]`);

            // 4. Course Check
            let allowedCourses = s.course_allowed || ["All"];
            const userCourse = course?.toLowerCase() || "";
            const userEdu = education_level?.toLowerCase() || "";
            const courseMatch = allowedCourses.some(c => {
                const lc = c.toLowerCase();
                if (lc === "all") return true;
                if (userCourse.includes(lc) || lc.includes(userCourse)) return true;
                if (userEdu && (lc.includes(userEdu) || userEdu.includes(lc))) return true;
                if (lc === "stem" && (userCourse.includes("engineering") || userCourse.includes("science") || userCourse.includes("tech"))) return true;
                return false;
            });
            if (!courseMatch) reasons.push(`Course/Edu [${userCourse}, ${userEdu}] not in [${allowedCourses.join(", ")}]`);

            console.log(`${reasons.length === 0 ? "✅" : "❌"} ${s.name.padEnd(35)} | ${reasons.join(" | ")}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

run();
