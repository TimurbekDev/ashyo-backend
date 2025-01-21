import { Module } from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { PrismaService } from '@prisma';
import { ProductService } from '../product/product.service';
import { UploadService } from '../upload';
import { CategoryService } from '../category';
import { ColorService } from '../color';

@Module({
  controllers: [ProductItemController],
  providers: [ProductItemService,PrismaService,ProductService,UploadService,CategoryService,ColorService],
})
export class ProductItemModule {}
