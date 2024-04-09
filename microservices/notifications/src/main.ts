import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { Eventbus, MessagingServer, Queue } from '@kishieel/relegatio-messaging';
import { CustomStrategy } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'templates'));

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            forbidUnknownValues: true,
        }),
    );

    // @todo: fix hardcoded config
    app.connectMicroservice<CustomStrategy>({
        strategy: new MessagingServer({
            rmqUrl: 'amqp://admin:admin@rabbit:5672',
            queue: Queue.Notifications,
            eventbus: Eventbus.Internal,
            exitOnError: true,
            exitOnClose: true,
        }),
    });
    await app.startAllMicroservices();

    await app.listen(3000);
}

bootstrap();
