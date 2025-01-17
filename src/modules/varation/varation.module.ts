import { Module } from '@nestjs/common';
import { VarationService } from './varation.service';
import { VarationController } from './varation.controller';
import { PrismaService } from '@prisma';
import { CategoryService } from '../category';
import { UploadService } from '../upload';

@Module({
  controllers: [VarationController],
  providers: [VarationService,PrismaService,CategoryService,UploadService],
})
export class VarationModule {}
