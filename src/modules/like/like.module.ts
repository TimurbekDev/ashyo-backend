import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PrismaService } from '@prisma';
import { UserService } from '../user';
import { CategoryService } from '../category';
import { UploadService } from '../upload';
import { ProductItemService } from '../product-item';
import { ProductService } from '../product';
import { ColorService } from '../color';

@Module({
  controllers: [LikeController],
  providers: [LikeService,PrismaService,ProductItemService,UserService,CategoryService,UploadService,ProductService,ColorService],
})
export class LikeModule {}
