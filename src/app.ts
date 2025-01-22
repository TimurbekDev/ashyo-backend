import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@prisma';
import { MailerModule } from '@nestjs-modules/mailer';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { appConfig, baseUrlConfig, jwtConfig, mailerConfig, redisConfig, throttleConfig } from '@config';
import { AddressModule, AuthModule, BrandModule, CartItemModule, CartModule, CategoryModule, ColorModule, JwtCustomModule, LikeModule, OrderItemModule, OrderModule, ProductItemModule, ProductModule, RateModule, RegionModule, ReviewModule, UsersModule, VarationModule, VarationOptionModule } from '@modules';
import { SeedsModule } from './seeds';
import { AuthGuard, RolesGuard } from '@guards';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mailerConfig, jwtConfig,redisConfig,throttleConfig,baseUrlConfig]

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
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [{
        ttl:config.get<number>('throttle.ttl'),
        limit:config.get<number>('throttle.limit')
      }]
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
    LikeModule,
    RateModule
  ],
  providers : [
    {
      provide : APP_GUARD,
      useClass : AuthGuard
    },
    {
      provide : APP_GUARD,
      useClass : RolesGuard
    },
    {
      provide : APP_GUARD,
      useClass : ThrottlerGuard
    }
  ]
})
export class AppModule { }
