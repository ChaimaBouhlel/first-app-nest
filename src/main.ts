import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import * as morgan from "morgan";
//import { DurationInterceptor } from "./interceptors/duration/duration.interceptor";
import * as dotenv from "dotenv";
import { ConfigService } from "@nestjs/config";

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOptions = {
    origin: ["http://localhost:3001"],
  };
  app.enableCors(corsOptions);
  app.use(morgan("dev"));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  //to use interceptors
  //app.useGlobalInterceptors(new DurationInterceptor());
  //await app.listen(process.env.APP_PORT);
  await app.listen(configService.get("APP_PORT"));
}
bootstrap();
