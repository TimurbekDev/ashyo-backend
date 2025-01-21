import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@prisma';
import { MailerModule } from '@nestjs-modules/mailer';
import { RedisModule } from '@nestjs-modules/ioredis';
import { appConfig, jwtConfig, redisConfig } from '@config';
import { AddressModule, AuthModule, CartItemModule, CartModule, CategoryModule, ColorModule, JwtCustomModule, OrderItemModule, OrderModule, ProductItemModule, RegionModule, ReviewModule, UsersModule, VarationModule, VarationOptionModule } from '@modules';
import { ServeStaticModule } from '@nestjs/serve-static';
import { mailerConfig } from './config/mailer-config';
import { SeedsModule } from './seeds';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, RolesGuard } from '@guards';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mailerConfig, jwtConfig,redisConfig]

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
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        options: {
          host: config.get<string>('redis.host'),
          port: config.get<number>('redis.port')
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
    ProductModule,
    VarationModule,
    VarationOptionModule,
    RegionModule,
    CartModule,
    AddressModule,
    BrandModule,
    ReviewModule,
    AddressModule,
    RegionModule,
    CartModule,
    ColorModule,
    OrderModule,
    ProductItemModule,
    OrderItemModule,
    CartItemModule,
  ],
  providers : [
    {
      provide : APP_GUARD,
      useClass : AuthGuard
    },
    {
      provide : APP_GUARD,
      useClass : RolesGuard
    }
  ]
})
export class AppModule { }
