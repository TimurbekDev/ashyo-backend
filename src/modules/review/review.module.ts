import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaService } from '@prisma';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category';
import { UserService } from '../user';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService,PrismaService,ProductService,CategoryService,UserService],
})
export class ReviewModule {}
