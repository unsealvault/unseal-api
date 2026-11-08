import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import config from "./config";
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);

  // CORS setup
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://unsealme.com',      
      'https://www.unsealme.com',
      'https://unsealme.org',   
      'https://www.unsealme.org'  
    ],
    credentials: true,
  });

  // global validation pipe setup 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  const PORT = config.port || 4001;
  app.use(cookieParser());
  await app.listen(PORT);
  console.log(`🚀 Server is running on: http://localhost:${PORT}/graphql`);
}
bootstrap();