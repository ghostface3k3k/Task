import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getCorsOrigins } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const corsOrigins = getCorsOrigins();
  
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Server is running on: http://localhost:${port}/graphql`);
  console.log(`🔐 CORS enabled for: ${corsOrigins.join(', ')}`);
}

bootstrap();
