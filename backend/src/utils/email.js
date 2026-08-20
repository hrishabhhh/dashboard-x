// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   connectionTimeout: 10000,
//   greetingTimeout: 10000,
//   socketTimeout: 10000,
// });

// export async function sendMail({ to, subject, html }) {
//   console.log("📧 Starting email send...");

//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html,
//     });

//     console.log("✅ Email sent:", info.messageId);

//     return info;
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//     throw error;
//   }
// }

// export default sendMail;

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({ to, subject, html }) {
  console.log("📧 Starting email send...");

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    if (error) {
      throw error;
    }

    console.log("✅ Email sent:", data.id);

    return data;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
}

export default sendMail;
