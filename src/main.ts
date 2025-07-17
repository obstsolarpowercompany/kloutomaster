import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger as Log4jsLogger } from "@nestjs/common";
import { AppModule } from "@modules/main/main.module";
import { initializeDataSource } from "./scripts/data-source";
import { ResponseInterceptor } from "./modules/main/infrastructure/response.interceptor";
import findAvailablePort from "./helpers/find-port";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });

  try {
    await initializeDataSource();
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    process.exit(1);
  }

  app.use(cookieParser());
  app.enable("trust proxy");
  app.enableCors();
  app.setGlobalPrefix("api/v1", {
    exclude: ["health", "probe"],
  });
  app.useGlobalInterceptors(new ResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle("Klouto core services microservice api")
    .setDescription("Klouto core services microservice api documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/docs", app, document);

  let port = app.get<ConfigService>(ConfigService).get<number>("server.port") || 3000;

  port = await findAvailablePort(port);
  await app.listen(port, () => {
    Log4jsLogger.log(`Application listening on port ${port}`);
  });
}

void bootstrap().catch((err) => {
  const logger = new Log4jsLogger();
  logger.error("Error during app bootstrapping");
  process.exit(1);
});
