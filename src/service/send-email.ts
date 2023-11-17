// "use server"

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});

export default async function sendEmail(
  formData: any,
  emailDestinationAddress: any,
  emailSubject: any
) {
  const mailOptions = {
    from: "noreply@salon-vins-gastronomie-bourges.com",
    to: emailDestinationAddress,
    subject: emailSubject,
    text: formData,
  };
  if (typeof formData !== "string") {
    console.error("Invalid formData format");
    return;
  }
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
