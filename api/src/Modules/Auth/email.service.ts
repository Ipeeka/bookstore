import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    const sendGridApiKey = process.env.SENDGRID_API_KEY;
    if (!sendGridApiKey) {
      throw new Error('SENDGRID_API_KEY is not set in environment variables');
    }

    sgMail.setApiKey(sendGridApiKey);
  }

  async sendVerificationEmail(
    to: string,
    token: string,
    firstName: string,
    lastName: string,
  ) {
    const verificationUrl = `http://localhost:3000/auth/verify-email?token=${token}`;
    const verificationExpireTime = '24 hours';

    const msg = {
      to: to,
      from: 'pawan.kumar@eplannerpro.com',
      subject: 'Please verify your email address',
      text: `Click on the link to verify your email from BookStore: ${verificationUrl}`,
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 100%;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                margin: 20px auto;
                max-width: 600px;
              }
              .header {
                background-color: #003399; 
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #ffffff;
                padding: 20px 0;
              }
              .email-icon {
                display: block;
                margin: 0 auto 20px;
                font-size: 50px;
                color: #ffffff;
              }
              .bold-header {
                font-weight: bold;
                font-size: 28px;
                text-align: center;
                margin-bottom: 20px; 
              }
              .bold-header sub {
                font-size: 16px;
              }
              .content {
                font-size: 16px;
                color: #333;
                line-height: 1.5;
                margin-top: 20px;
              }
              .button {
                display: block;
                width: 200px;
                padding: 12px;
                text-align: center;
                background-color: #ff6600;
                color: white;
                font-size: 16px;
                border-radius: 5px;
                text-decoration: none;
                margin: 20px auto;
              }
              .footer {
                text-align: center;
                font-size: 12px;
                color: #999;
                margin-top: 30px;
              }
              .social-links {
                display: flex;
                justify-content: center;
                gap: 20px;
              }
              .social-links a {
                text-decoration: none;
                color: #333;
                font-size: 18px;
              }
              .social-links i {
                font-size: 30px; 
                color: #333;
              }
              .disclaimer {
                font-size: 14px;
                text-align: center;
                color: #666;
                margin-top: 20px;
              }
              .get-in-touch {
                font-weight: bold; /* Bold the "Get in touch" text */
              }
            </style>
           
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
          </head>
          <body>
            <div class="container">
              
             
              <div class="bold-header">
                YOUR BOOKSTORE<sub>.com</sub>
              </div>

           
              <div class="header">
                <i class="fas fa-envelope email-icon"></i> 
                <div>
                <p>T H A N K S   F O R   S I G N I N G   U P !</p>
                  
                </div>
              </div>

           
              <div class="content">
                <p>Hi ${firstName} ${lastName},</p>
                <p>We're happy you signed up.  You're almost ready to get started. Pleas verify your email address . To start exploring and enjoy exclusive services with us!</p>
                <a href="${verificationUrl}" class="button" style="color:white;">VERIFY YOUR EMAIL</a>
                <p>Thanks,<br>The BOOKSTORE Team</p>
              </div>

              <div class="disclaimer">
                <p>Did you receive this email without signing up? <a href="${verificationUrl}" style="color: #003399;">Click here</a>.</p>
                <p>This verification link will expire in ${verificationExpireTime}.</p>
              </div>

        
              <div class="footer">
                <p class="get-in-touch">Get in touch:</p>
                <p>+11 111 333 4444 | Info@bookstore.com</p>
                <div class="social-links">
                  <a href="https://www.facebook.com"><i class="fab fa-facebook"></i></a>
                  <a href="https://www.linkedin.com"><i class="fab fa-linkedin"></i></a>
                  <a href="https://www.instagram.com"><i class="fab fa-instagram"></i></a>
                  <a href="https://www.youtube.com"><i class="fab fa-youtube"></i></a>
                </div>
                <p>Copyrights ©pawan All Rights Reserved</p>
              </div>

            </div>
          </body>
        </html>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('SendGrid Error:', error.response.body);
      throw new Error('Failed to send verification email');
    }
  }
}
