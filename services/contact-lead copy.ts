"use server";

import nodemailer from "nodemailer";

/**
 * Same SMTP env vars jo channel partner form use karta hai:
 *
 * SMTP_HOST=smtp.hostinger.com
 * SMTP_PORT=465
 * SMTP_SECURE=true
 * SMTP_USER=your@yourdomain.com
 * SMTP_PASS=your-mailbox-password
 * CONTACT_TO_EMAIL=info@varshagroup.com
 */

// Return type ka shape — modal component mein bhi yahi type import karke use karenge
export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function sendContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();

  // Basic server-side validation
  if (!name || !email || !phone) {
    return {
      success: false,
      message: "Please fill in all fields.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return {
      success: false,
      message: "Please enter a valid 10-digit phone number.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Price Enquiry — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
          <h2 style="color:#ff481f;">New Contact Popup Submission</h2>
          <table cellpadding="6" style="border-collapse: collapse;">
            <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
            <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
          </table>
        </div>
      `,
    });

    return {
      success: true,
      message: "Thank you! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact popup email error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
