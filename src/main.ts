import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import config from "./config";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS setup
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // global validation pipe setup 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Only allow properties that are in the DTO
      forbidNonWhitelisted: true, //Reject properties that are not in the DTO
      transform: true, //Transform incoming data to match the DTO structure
    }),
  );

  const PORT = config.port || 4000;
  app.use(cookieParser());
  await app.listen(PORT);
  console.log(`🚀 Server is running on: http://localhost:${PORT}/graphql`);
}
bootstrap();
