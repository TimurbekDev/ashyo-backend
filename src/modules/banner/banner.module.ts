import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { PrismaService } from '@prisma';
import { ProductService } from '../product';
import { CategoryService } from '../category';
import { UploadService } from '../upload';

@Module({
  controllers: [BannerController],
  providers: [BannerService,PrismaService,ProductService,CategoryService,UploadService],
})
export class BannerModule {}
