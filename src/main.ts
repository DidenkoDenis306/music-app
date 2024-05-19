import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5555;
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Music App Api')
      .setDescription('Documentation of Music-API')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
