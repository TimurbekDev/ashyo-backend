import { Module } from '@nestjs/common';
import { MailerCustomService } from './mailer.service';


@Module({
  providers: [MailerCustomService],
})
export class MailerModule {}
