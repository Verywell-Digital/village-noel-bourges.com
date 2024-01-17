// "use server"

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_SMTP_HOST,
  port: parseInt(process.env.NEXT_PUBLIC_SMTP_PORT, 10),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});

export default async function sendEmail(
  formData: any,
  emailSourceAddress: any,
  emailDestinationAddress: any,
  emailSubject: any
) {
  const mailOptions = {
    // from: "noreply@salon-vins-gastronomie-bourges.com",
    from: emailSourceAddress,
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
