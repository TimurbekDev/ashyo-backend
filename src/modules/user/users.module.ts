import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaModule, PrismaService } from '@prisma';

import { MailerCustomService } from '../mailer/mailer.service';
import { UserService } from './users.service';
import { UploadService } from '../upload';





@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UserService,PrismaService,MailerCustomService,UploadService],
})
export class UsersModule {}
