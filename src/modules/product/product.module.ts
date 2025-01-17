import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '@prisma';
import { CategoryService } from '../category';
import { UploadService } from '../upload';

@Module({
  controllers: [ProductController],
  providers: [ProductService,PrismaService,CategoryService,UploadService],
})
export class ProductModule {}
