import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

@Module({
  controllers: [RegionController],
  providers: [RegionService,PrismaService],
})
export class RegionModule {}
