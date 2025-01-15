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
              <p style="color: #666666; font-size: 16px;">We have received a sign-up attempt with the following code. Please enter it in the browser window where you started signing up.</p>
              <div style="background: #f4f4f4; padding: 15px; border-radius: 4px; font-size: 32px; font-weight: bold; margin: 20px 0; color: #333333;">
                ${payload.text}
              </div>
              <p style="color: #999999; font-size: 14px;">If you did not attempt to sign up but received this email, please disregard it. The code will remain active for 10 minutes.</p>
              <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <p style="color: #aaaaaa; font-size: 12px;">Logto, an effortless identity solution with all the features you need.</p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
  
}
