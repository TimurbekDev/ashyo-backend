import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '@prisma';
import { RegionService } from '../region';
import { UserService } from '../user';
import { AddressService } from '../address';
import { UploadService } from '../upload';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, AddressService, UserService,UploadService, RegionService],
})
export class OrderModule { }
