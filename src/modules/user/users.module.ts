import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaModule, PrismaService } from '@prisma';
import { UserService } from './users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UserService,PrismaService],
})
export class UsersModule {}
