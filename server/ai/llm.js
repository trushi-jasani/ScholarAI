import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateSOP(user, scholarship) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Generate a professional Statement of Purpose (250 words).

Student:
Name: ${user.name}
Course: ${user.course}
Category: ${user.category}
Income: ${user.income}
State: ${user.state}

Scholarship:
${scholarship.name}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function explainScholarship(user, scholarship) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Explain in 2–3 lines why this scholarship suits the student.

Student: ${JSON.stringify(user)}
Scholarship: ${JSON.stringify(scholarship)}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
