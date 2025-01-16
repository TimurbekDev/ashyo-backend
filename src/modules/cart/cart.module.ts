import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService,PrismaService],
})
export class CartModule {}
