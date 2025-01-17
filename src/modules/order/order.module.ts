import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '@prisma';
import { CartService } from '../cart';
import { AddressService } from '../address';
import { RegionService } from '../region';
import { UserService } from '../user';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, CartService, AddressService, RegionService, UserService, RegionService],
})
export class OrderModule { }
