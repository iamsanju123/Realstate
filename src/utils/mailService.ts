import nodemailer from 'nodemailer';

// Define email options interface (optional but useful)
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// EMAIL_USER=kumaeankit9753@gmail.com
// EMAIL_PASS=lirhadecjobjjmbk

export const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<void> => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "kumarankit9753@gmail.com", //process.env.EMAIL_USER, // Your Gmail address
        pass: "lirhadecjobjjmbk",//process.env.EMAIL_PASS, // App password
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"Your App Name" <${"kumarankit9753@gmail.com"}>`,
      to,
      subject,
      html,
    });

    console.log('✅ Email sent successfully to', to);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};
