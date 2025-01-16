import { appConfig, jwtConfig } from '@config';
import { AuthModule, CategoryModule, JwtCustomModule, UsersModule, VarationModule, VarationOptionModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@prisma';

import { mailerConfig } from './config/mailer-config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { SeedsModule } from './seeds';
import { UploadModule } from './modules/upload';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mailerConfig, jwtConfig]

    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('email.host'),
          port: config.get<number>('email.port'),
          auth: {
            user: config.get<string>('email.user'),
            pass: config.get<string>('email.pass')
          }
        }
      })
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: "./uploads",
        serveRoot: "/files"
      },
      {
        rootPath: "./public",
        serveRoot: "/public"
      }
    ),
    PrismaModule,
    AuthModule,
    UsersModule,
    JwtCustomModule,
    SeedsModule,
    CategoryModule,
    VarationModule,
    VarationOptionModule
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    }
  ]
})
export class AppModule { }
