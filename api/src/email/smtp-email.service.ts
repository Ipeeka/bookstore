import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SmtpEmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASSWORD,
      },
    });

    console.log('SmtpEmailService initialized');
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: process.env.SMTP_EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendEmailToAllUsers(
    users: string[],
    subject: string,
    text: string,
    html: string,
  ) {
    for (const user of users) {
      await this.sendEmail(user, subject, text, html);
    }
  }
}
