import { Module } from '@nestjs/common';
import { VarationService } from './varation.service';
import { VarationController } from './varation.controller';
import { PrismaService } from '@prisma';

@Module({
  controllers: [VarationController],
  providers: [VarationService,PrismaService],
})
export class VarationModule {}
