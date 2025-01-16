import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from '@prisma';
import { UploadService } from '../upload';

@Module({
  controllers: [BrandController],
  providers: [BrandService,PrismaService,UploadService],
})
export class BrandModule {}
