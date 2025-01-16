import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { AddressController } from './adress.controller';
import { AddressService } from './adress.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService,PrismaService],
})
export class AddressModule {}
