import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.replace(';', ''));

export async function getRequiredDocuments(scholarship) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        List the required documents for the following scholarship in a standard bulleted format. 
        Be specific based on the scholarship name and eligibility.
        
        Scholarship: ${scholarship.name}
        Income Limit: ₹${scholarship.income_limit}
        Allowed Categories: ${scholarship.category_allowed}
        Allowed Courses: ${scholarship.course_allowed}
        
        Response format: Just the list of documents, one per line, no introductory text.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (err) {
        console.error("Document AI Error:", err.message);
        return "- Mark sheets of previous examinations\n- Identity Proof (Aadhaar/PAN)\n- Income Certificate\n- Category/Caste Certificate (if applicable)\n- Admission Letter/Proof";
    }
}
