import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { PrismaService } from '@prisma';
import { UserService } from '../user';
import { CartService } from '../cart/cart.service';
import { ProductItemService } from '../product-item';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category';
import { UploadService } from '../upload';
import { ColorService } from '../color';

@Module({
  controllers: [CartItemController],
  providers: [CartItemService,PrismaService,CartService,UserService,ProductItemService,ProductService,CategoryService,UploadService,ColorService],
})
export class CartItemModule {}
