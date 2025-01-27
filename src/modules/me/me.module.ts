import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { UserService } from '../user';
import { PrismaService } from '@prisma';
import { UploadService } from '../upload';

@Module({
  controllers: [MeController],
  providers: [MeService,UserService,PrismaService,UploadService],
})
export class MeModule {}
