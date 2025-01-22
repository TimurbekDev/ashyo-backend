import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISendMailPayload } from './interfaces';

@Injectable()
export class MailerCustomService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(MailerService) private mailerService: MailerService,
  ) {}

  async sendOTP(payload: ISendMailPayload): Promise<void> {

    try {
      await this.mailerService.sendMail({
        to: payload.to,
        from: this.configService.get<string>('email.user'),
        subject: payload.subject,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <img src="https://i.imgur.com/NIJKjMe.png" alt="Logo" style="width: 50px; margin-bottom: 20px;" />
              <h1 style="font-size: 24px; color: #333333;">${payload.subject}</h1>
              <p style="color: #666666; font-size: 16px;">We received a request to reset your password. Please enter this one-time code in the required field to reset your password.</p>
              <div style="background: #f4f4f4; padding: 15px; border-radius: 4px; font-size: 32px; font-weight: bold; margin: 20px 0; color: #333333;">
                ${payload.text}
              </div>
              <p style="color: #999999; font-size: 14px;">If you did not attempt to sign up but received this email, please disregard it. The code will remain active for 2 minutes.</p>
              <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <p style="color: #aaaaaa; font-size: 12px;">Ashyo — a modern and convenient e-commerce solution with all the features you need.</p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
  


  async CreatedUserMessage(payload: ISendMailPayload): Promise<void> {

    try {
      await this.mailerService.sendMail({
        to: payload.to,
        from: this.configService.get<string>('email.user'),
        subject: payload.subject,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <img src="https://i.imgur.com/NIJKjMe.png" alt="Logo" style="width: 50px; margin-bottom: 20px;" />
              <h1 style="font-size: 24px; color: #333333;">Welcome to Ashyo, ${payload.text}!</h1>
              <p style="color: #666666; font-size: 16px;">Your account has been successfully created. We're excited to have you onboard!</p>
              <div style="background: #f4f4f4; padding: 15px; border-radius: 4px; font-size: 18px; font-weight: bold; margin: 20px 0; color: #333333;">
                Email: ${payload.to}
              </div>
              <p style="color: #999999; font-size: 14px;">If this was not you, please contact our support team immediately.</p>
              <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <p style="color: #aaaaaa; font-size: 12px;">Ashyo — a modern and convenient e-commerce solution with all the features you need.</p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
    
  }

  async VerficationMail(payload: ISendMailPayload){
    try {
      await this.mailerService.sendMail({
        to: payload.to,
        from: this.configService.get<string>('email.user'),
        subject: 'Verify your email address',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <img src="https://i.imgur.com/NIJKjMe.png" alt="Logo" style="width: 50px; margin-bottom: 20px;" />
              <h1 style="font-size: 24px; color: #333333;">Verify your email address</h1>
              <p style="color: #666666; font-size: 16px;">Please confirm that you want to use this as your account email address. Once it’s done, you will be able to start using our services!</p>
              <a 
                href="${payload.text}" 
                style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; font-size: 16px; border-radius: 4px;">
                Verify my email
              </a>
              <p style="color: #999999; font-size: 14px; margin-top: 20px;">Or paste this link into your browser:</p>
              <p style="color: #007BFF; font-size: 14px;">${payload.text}</p>
              <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <p style="color: #aaaaaa; font-size: 12px;">Ashyo — a modern and convenient e-commerce solution with all the features you need.</p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
    
    
  }

}
