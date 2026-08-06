import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !company || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a transporter using Outlook/Office 365
    // For production, use environment variables for sensitive data
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp-mail.outlook.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ceo@brandsforhome.sa',
      subject: `New Wholesale Request from ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #000;">New Wholesale Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Project/Company:</strong> ${company}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This email was sent from the HOVEN Wholesale website.</p>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to customer
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your inquiry - HOVEN',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #000;">Thank you for your interest in HOVEN</h2>
          <p>Dear ${name},</p>
          <p>We have received your wholesale inquiry and will get back to you shortly.</p>
          <p><strong>Your details:</strong></p>
          <p>Company: ${company}</p>
          <p>Phone: ${phone}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p>Best regards,<br><strong>HOVEN Wholesale Team</strong></p>
          <p style="color: #666; font-size: 12px;">
            <a href="https://brandsforhome.sa" style="color: #666;">brandsforhome.sa</a>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
