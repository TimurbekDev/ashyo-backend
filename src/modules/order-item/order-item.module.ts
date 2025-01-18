import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { PrismaService } from '@prisma';
import { OrderService } from '../order/order.service';
import { UserService } from '../user';
import { ProductItemService } from '../product-item';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category';
import { AddressService } from '../address';
import { UploadService } from '../upload';
import { RegionService } from '../region';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService,PrismaService,OrderService,UserService,ProductItemService,ProductService,CategoryService,AddressService,UploadService,RegionService],
})
export class OrderItemModule {}
