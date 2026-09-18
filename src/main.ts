import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import config from "./config";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS setup
  // app.enableCors({
  //   origin: true,
  //   credentials: true,
  // });


  app.enableCors({
  origin: [ 
    "http://localhost:3000",
    "http://localhost:3001",
    "http://unseal.ydctcenter.org",
    "https://unseal.ydctcenter.org",
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

  const PORT = config.port || 4000;
  app.use(cookieParser());
  await app.listen(PORT);
  console.log(`🚀 Server is running on: http://localhost:${PORT}/graphql`);
}
bootstrap();