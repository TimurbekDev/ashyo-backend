import { appConfig } from '@config';
import { UsersModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    PrismaModule,
    UsersModule,
  ],
})
export class AppModule {}
