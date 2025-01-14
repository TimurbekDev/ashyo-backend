import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';

async function startApp() {
  const app = await NestFactory.create(AppModule);



  const configService = app.get(ConfigService)
  const port = configService.get<number>("app.port")
  await app.listen(port, ()=>{
    console.log(`server is listening on port: ${port}`)
  });
}
startApp();
 