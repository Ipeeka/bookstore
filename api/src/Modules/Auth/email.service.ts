import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
    constructor() {
        const sendGridApiKey = process.env.SENDGRID_API_KEY;
        if (!sendGridApiKey) {
          throw new Error('SENDGRID_API_KEY is not set in environment variables');
        }
      
        console.log('SendGrid API Key: ', sendGridApiKey); 
        sgMail.setApiKey(sendGridApiKey);  
      }
      
  async sendVerificationEmail(to: string, token: string) {
    const verificationUrl = `http://localhost:3000/auth/verify-email?token=${token}`;

    const msg = {
      to: to, 
      from: 'pawan.kumar@eplannerpro.com', 
      subject: 'Please verify your email address',
      text: `Click on the link to verify your email from PAWAN: ${verificationUrl}`,
      html: `<p>Click on the <a href="${verificationUrl}"><b>Verify</b></a> to verify your email.</p>`,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      throw new Error('Failed to send verification email');
    }
  }
}
