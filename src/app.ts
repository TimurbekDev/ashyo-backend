import { appConfig } from '@config';
import { UsersModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@prisma';
import { mailerConfig } from './config/mailer-config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig,mailerConfig]
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
    UsersModule,
  ],
})
export class AppModule {}
