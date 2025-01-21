import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from '@filters';

async function startApp() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const config = new DocumentBuilder()
  .setTitle('Ashyo')
  .setVersion('1.0')
  
  .addBearerAuth({
    type: 'http',
    scheme: 'Bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
  }, 'auth')
  .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
  
  app.useGlobalFilters(new AllExceptionFilter);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  const port = configService.get<number>("app.port");
  
  await app.listen(port, () => {
    console.log(`server is listening on port: ${port}`)
  });
}
startApp();
