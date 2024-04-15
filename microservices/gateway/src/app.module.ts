import { Module } from '@nestjs/common';
import { GraphqlModule } from '@app/modules/graphql.module';
import { RabbitModule } from '@app/modules/rabbit.module';
import { ConfigModule } from '@app/configs/config.module';

@Module({
    imports: [GraphqlModule, RabbitModule, ConfigModule],
})
export class AppModule {
}
