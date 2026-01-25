import nodemailer from "nodemailer";
import { getRequiredDocuments } from "./documentService.js";
import "dotenv/config";

let transporter;
let isDemoMode = false;
let initializationPromise = null;

async function initTransporter() {
    if (initializationPromise) return initializationPromise;

    initializationPromise = (async () => {
        try {
            if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your-gmail@gmail.com' && !process.env.EMAIL_PASS.includes('your-app-password')) {
                console.log("Checking primary Gmail config...");
                const primary = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER.trim(),
                        pass: process.env.EMAIL_PASS.trim()
                    }
                });

                // This will throw if password is bad
                await primary.verify();
                transporter = primary;
                isDemoMode = false;
                console.log("✅ REAL GMAIL SYSTEM IS ACTIVE.");
            } else {
                throw new Error("Credentials missing");
            }
        } catch (err) {
            console.warn("⚠️ Falling back to Demo Mode: " + err.message);
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: { user: testAccount.user, pass: testAccount.pass }
            });
            isDemoMode = true;
            console.log("🚀 DEMO MODE ACTIVE. Test Mail: " + testAccount.user);
        }
    })();

    return initializationPromise;
}

// Start init early
initTransporter();

export async function sendMatchEmail(userEmail, userName, scholarship) {
    try {
        await initTransporter();

        const documents = await getRequiredDocuments(scholarship);
        const senderMail = (!isDemoMode && process.env.EMAIL_USER) ? process.env.EMAIL_USER : 'demo@scholarai.com';

        const mailOptions = {
            from: `"ScholarAI Support" <${senderMail}>`,
            to: userEmail,
            subject: `🎉 Congratulations! You match with ${scholarship.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Hi ${userName},</h2>
                    <p>We found a new scholarship match for you on <strong>ScholarAI</strong>!</p>
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; margin: 20px 0;">
                        <h3 style="color: #4f46e5; margin-top: 0;">${scholarship.name}</h3>
                        <p><strong>Benefits:</strong> Up to ₹${(scholarship.income_limit / 100000).toFixed(1)}L per year funding.</p>
                        <p><strong>Deadline:</strong> ${new Date(scholarship.deadline).toLocaleDateString()}</p>
                    </div>

                    <h3>📜 Required Documents for Application:</h3>
                    <ul>
                        ${documents.split('\n').map(doc => `<li>${doc.replace(/^-\s*/, '')}</li>`).join('')}
                    </ul>

                    <p>Log in to your dashboard to generate your SOP and start your application.</p>
                    
                    <div style="margin-top: 30px;">
                        <a href="http://localhost:5173/scholarships/${scholarship.id}" 
                           style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                           View Scholarship Details
                        </a>
                    </div>

                    <p style="margin-top: 40px; font-size: 0.8rem; color: #64748b;">
                        You received this because you match the criteria for ${scholarship.name}. 
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${userEmail}`);

        const previewUrl = nodemailer.getTestMessageUrl(info);
        return { success: true, previewUrl };
    } catch (err) {
        let errorMsg = err.message;
        if (errorMsg.includes('535-5.7.8')) {
            errorMsg = "GMAIL REJECTED YOUR PASSWORD. You must use a 16-character 'App Password' from your Google Account settings, not your regular Gmail password.";
        }
        console.error("Email Delivery Error:", errorMsg);
        return { success: false, error: errorMsg };
    }
}
