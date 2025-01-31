import { Module } from '@nestjs/common';
import { MailerCustomService } from './mailer.service';
import { MailerController } from './mailer.controller';


@Module({
  controllers: [MailerController],
  providers: [MailerCustomService],
})
export class CustomMailerModule {}
