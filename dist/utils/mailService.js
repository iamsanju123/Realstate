var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from 'nodemailer';
// EMAIL_USER=kumaeankit9753@gmail.com
// EMAIL_PASS=lirhadecjobjjmbk
export const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, html }) {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "kumarankit9753@gmail.com", //process.env.EMAIL_USER, // Your Gmail address
                pass: "lirhadecjobjjmbk", //process.env.EMAIL_PASS, // App password
            },
        });
        // Send mail
        yield transporter.sendMail({
            from: `"Your App Name" <${"kumarankit9753@gmail.com"}>`,
            to,
            subject,
            html,
        });
        console.log('✅ Email sent successfully to', to);
    }
    catch (error) {
        console.error('❌ Failed to send email:', error);
        throw error;
    }
});
