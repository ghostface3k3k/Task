import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const corsOrigins = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:4200'];
  
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
