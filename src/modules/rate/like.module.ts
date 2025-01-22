import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ProductService } from '../product';
import { UserService } from '../user';
import { CategoryService } from '../category';
import { UploadService } from '../upload';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';

@Module({
  controllers: [RateController],
  providers: [RateService,PrismaService,ProductService,UserService,CategoryService,UploadService],
})
export class RateModule {}
