import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '@prisma';
import { UploadService } from '../upload';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,PrismaService,UploadService],
})
export class CategoryModule {}
