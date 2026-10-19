import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import config from "./config";
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS setup
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://unsealme.com',        // আপনার লাইভ ফ্রন্টএন্ড ডোমেইন (প্রয়োজনমতো পরিবর্তন করুন)
      'https://www.unsealme.com',
      'https://unsealme.org',        // আপনার লাইভ ফ্রন্টএন্ড ডোমেইন (প্রয়োজনমতো পরিবর্তন করুন)
      'https://www.unsealme.org'      // www সহ বা সাবডোমেইন থাকলে তা এখানে দিন
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