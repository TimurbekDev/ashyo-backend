import { Module } from '@nestjs/common';
import { VarationOptionService } from './varation-option.service';
import { VarationOptionController } from './varation-option.controller';
import { PrismaService } from '@prisma';
import { VarationService } from '../varation/varation.service';
import { CategoryService } from '../category';
import { UploadService } from '../upload';

@Module({
  controllers: [VarationOptionController],
  providers: [VarationOptionService, PrismaService, VarationService, CategoryService,UploadService],
})
export class VarationOptionModule { }
