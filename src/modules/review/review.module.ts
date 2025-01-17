import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaService } from '@prisma';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category';
import { UserService } from '../user';
import { UploadService } from '../upload';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService,PrismaService,ProductService,CategoryService,UserService,UploadService],
})
export class ReviewModule {}