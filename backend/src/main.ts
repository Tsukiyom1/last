import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";
import { json } from "express";
import { ValidationPipe } from "@nestjs/common";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cors());
	app.use(json());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
			forbidUnknownValues: false,
		}),
	);
	await app.listen(3001);
}
bootstrap();
