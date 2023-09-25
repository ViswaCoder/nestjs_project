import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { INestMicroservice, ValidationPipe } from "@nestjs/common";
import { join } from "path";

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: "127.0.0.1:4001",
        package: "protobufPackage",
        protoPath: join(__dirname, "proto/e-wallet/e-wallet.proto"),
      },
    }
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}
bootstrap();
