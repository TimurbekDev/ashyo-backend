import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule, PrismaService } from '@prisma';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService,PrismaService],
})
export class UsersModule {}
