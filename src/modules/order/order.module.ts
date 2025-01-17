import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '@prisma';
import { RegionService } from '../region';
import { UserService } from '../user';
import { AddressService } from '../address';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, AddressService, RegionService, UserService, RegionService],
})
export class OrderModule { }
