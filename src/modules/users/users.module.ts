import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule, PrismaService } from '@prisma';
import { MailerCustomService } from '../mailer/mailer.service';


@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService,PrismaService,MailerCustomService],
})
export class UsersModule {}
