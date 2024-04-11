import { BindingsModule, MessagingModule } from '@kishieel/relegatio-messaging';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitConfig, RabbitConfigToken } from '@app/configs/rabbit.config';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        BindingsModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const rabbitConfig = configService.getOrThrow<RabbitConfig>(RabbitConfigToken);
                return {
                    httpUrl: rabbitConfig.httpUrl,
                    eventbus: rabbitConfig.eventbus,
                    queue: rabbitConfig.queue,
                };
            },
            inject: [ConfigService],
        }),
        MessagingModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const rabbitConfig = configService.getOrThrow<RabbitConfig>(RabbitConfigToken);
                return { rmqUrl: rabbitConfig.rmqUrl };
            },
            inject: [ConfigService],
        }),
    ],
})
export class RabbitModule {}
