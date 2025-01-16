import { Module } from '@nestjs/common';
import { VarationService } from './varation.service';
import { VarationController } from './varation.controller';
import { PrismaService } from '@prisma';
import { CategoryService } from '../category';

@Module({
  controllers: [VarationController],
  providers: [VarationService,PrismaService,CategoryService],
})
export class VarationModule {}
