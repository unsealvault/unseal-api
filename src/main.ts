import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import config from "./config";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS কনফিগারেশন
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // global validation pipe setup
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO তে ডিফাইন করা ফিল্ড ছাড়া অন্য ফিল্ড থাকলে তা অটোমেটিক রিমুভ করবে
      forbidNonWhitelisted: true, // বাড়তি ফিল্ড পাঠালে এরর দেবে
      transform: true, // ইনকামিং ডাটাকে অটোমেটিক সঠিক টাইপে কনভার্ট করবে
    }),
  );

  const PORT = config.port || 4000;
  app.use(cookieParser());
  await app.listen(PORT);
  console.log(`🚀 Server is running on: http://localhost:${PORT}/graphql`);
}
bootstrap();
