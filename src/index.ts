import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./server/app.module";
import helmet from "helmet";
import compression from "compression";

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.disable("x-powered-by");
  app.use(helmet()).use(compression());
  app.set("trust proxy", 1);
  app.useStaticAssets(process.env.RAZZLE_PUBLIC_DIR, {
    index: false,
    redirect: false,
  });

  await app.listen(process.env.PORT || 3000, () => {
    Logger.log(`🚀server is runing on http://localhost:${process.env.PORT || 3000}`);
  });

  if (module.hot) {
    Logger.log("HMR Reloading ...");
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
