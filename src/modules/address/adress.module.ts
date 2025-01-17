import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { AddressController } from './adress.controller';
import { AddressService } from './adress.service';
import { UserService } from '../user';
import { RegionService } from '../region';

@Module({
  controllers: [AddressController],
  providers: [AddressService,PrismaService,UserService,RegionService],
})
export class AddressModule {}
