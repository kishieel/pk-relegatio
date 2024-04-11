import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { MessagingServer } from '@kishieel/relegatio-messaging';
import { CustomStrategy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NestConfig, NestConfigToken } from '@app/configs/nest.config';
import { RabbitConfig, RabbitConfigToken } from '@app/configs/rabbit.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            forbidUnknownValues: true,
        }),
    );

    const configService = app.get(ConfigService);
    const nestConfig = configService.getOrThrow<NestConfig>(NestConfigToken);
    const rabbitConfig = configService.getOrThrow<RabbitConfig>(RabbitConfigToken);

    app.connectMicroservice<CustomStrategy>({
        strategy: new MessagingServer({
            rmqUrl: rabbitConfig.rmqUrl,
            queue: rabbitConfig.queue,
            eventbus: rabbitConfig.eventbus,
            exitOnError: rabbitConfig.exitOnError,
            exitOnClose: rabbitConfig.exitOnClose,
        }),
    });
    await app.startAllMicroservices();
    await app.listen(nestConfig.port, nestConfig.host);
}

bootstrap();
