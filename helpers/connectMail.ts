import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
interface EmailOptions {
  email: string;
  emailType: 'VERIFY' | 'RESET' | string;
  userId: string;
  html?: string;     // ✅ Add this
  subject?: string;  // ✅ Add this
}

export const sendEmail = async ({ email, emailType, userId, html, subject }: EmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const finalSubject = subject || (emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password');
    const finalHtml = html || `
      <p>Default content. No HTML provided.</p>
    `;

    await transporter.sendMail({
      from: `"SkillSwap" <${process.env.MAILER_FROM}>`,
      to: email,
      subject: finalSubject,
      html: finalHtml,
    });

  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Email sending failed');
  }
};
