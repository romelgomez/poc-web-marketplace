import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfigService } from './modules/config/config.service';
// import rateLimit from 'express-rate-limit';
// import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);

  // Set global prefix
  app.setGlobalPrefix('api');

  // Enable Cors
  app.enableCors();

  // Use helmet for basic security
  // app.use(helmet());

  // https://github.com/graphql/graphql-playground/issues/1283
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production',

      // TODO: to check out with docker
      // contentSecurityPolicy: {
      //   directives: {
      //     defaultSrc: ["'self'"],
      //     scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "cdn.jsdelivr.net"],
      //     styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
      //     imgSrc: ["'self'", "data:", "cdn.jsdelivr.net"],
      //     connectSrc: ["'self'", "https://hardy-weasel-66.clerk.accounts.dev"],
      //     // add other directives as needed
      //   },
      // },
    }),
  );

  // Rate Limiting
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );

  // Enable response compression
  // app.use(compression());

  // Use global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Create a logger instance
  const logger = new Logger('Bootstrap');

  // Start the application

  const port = configService.getPort() || 3000;
  await app.listen(port);

  logger.log(
    `\n\n ..:: Graphql is running on: http://localhost:${port}/graphql \n\n`,
  );
}
bootstrap();
