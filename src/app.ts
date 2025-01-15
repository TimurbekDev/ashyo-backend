import { appConfig, jwtConfig } from '@config';
import { AuthModule, JwtCustomModule, UsersModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig,jwtConfig]
    }),
    PrismaModule,
    UsersModule,
    JwtCustomModule,
    AuthModule
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    }
  ]
})
export class AppModule { }
