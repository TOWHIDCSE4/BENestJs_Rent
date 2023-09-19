// src/swagger.config.ts
import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerCustomOptions: SwaggerCustomOptions = {
  explorer: true,
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestDuration: true,
  },
};

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS Swagger Example')
  .setDescription('API documentation for NestJS application')
  .setVersion('1.0')
  .addTag('api')
  .build();
