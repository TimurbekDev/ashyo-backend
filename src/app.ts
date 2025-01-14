import { appConfig } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
