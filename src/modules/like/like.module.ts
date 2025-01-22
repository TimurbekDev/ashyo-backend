import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PrismaService } from '@prisma';
import { ProductService } from '../product';
import { UserService } from '../user';
import { CategoryService } from '../category';
import { UploadService } from '../upload';

@Module({
  controllers: [LikeController],
  providers: [LikeService,PrismaService,ProductService,UserService,CategoryService,UploadService],
})
export class LikeModule {}
