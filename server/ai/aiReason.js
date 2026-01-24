import fetch from "node-fetch";

export async function aiExplain(user, scholarship) {
  const prompt = `
Student Profile:
Income: ${user.income}
Category: ${user.category}
Course: ${user.course}

Scholarship:
Name: ${scholarship.name}
Income Limit: ${scholarship.income_limit}
Categories Allowed: ${scholarship.category_allowed.join(", ")}

Explain in 1-2 lines why this scholarship suits the student.
`;

  // MOCK AI (hackathon-safe fallback)
  return `AI Match: Suitable due to income eligibility and ${user.course} background.`;
}
