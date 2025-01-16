import { Module } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { UploadService } from '../upload';
import { PrismaService } from '@prisma';

@Module({
  controllers: [ProductItemController],
  providers: [ProductItemService,UploadService,PrismaService],
})
export class ProductItemModule {}
