import { HttpException, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayConfig, GatewayConfigToken } from '@app/configs/gateway.config';
import { AuthenticatedDataSource } from '@app/data-source/authenticated-data-source';
import { Eventbus, MessagingService } from '@kishieel/relegatio-messaging';
import type { GraphQLFormattedError } from 'graphql/index';
import { formatError } from '@app/utils/format-error.function';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
            driver: ApolloGatewayDriver,
            imports: [ConfigModule],
            useFactory: (eventbus: MessagingService, configService: ConfigService) => {
                const gatewayConfig = configService.getOrThrow<GatewayConfig>(GatewayConfigToken);

                return {
                    server: {
                        ...gatewayConfig.server,
                        autoTransformHttpErrors: false,
                        formatError: formatError,
                    },
                    gateway: {
                        ...gatewayConfig.gateway,
                        buildService: ({ url }) => new AuthenticatedDataSource({ url }, eventbus),
                    },
                };
            },
            inject: [Eventbus.Internal, ConfigService],
        }),
    ],
})
export class GraphqlModule {

}
