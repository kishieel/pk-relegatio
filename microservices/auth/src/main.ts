import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { Eventbus, MessagingServer, Queue } from '@kishieel/relegatio-messaging';
import { CustomStrategy } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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
            rmqUrl: 'amqp://user:admin@rabbit:5672',
            queue: Queue.Auth,
            eventbus: Eventbus.Internal,
            exitOnError: true,
            exitOnClose: true,
        }),
    });
    await app.startAllMicroservices();

    await app.listen(3000);
}

bootstrap();
