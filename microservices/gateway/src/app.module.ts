import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import * as process from 'process';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
            driver: ApolloGatewayDriver,
            server: {
                playground: true,
            },
            gateway: {
                debug: process.env.NODE_ENV !== 'production',
                supergraphSdl: new IntrospectAndCompose({
                    subgraphs: [{ name: 'posts', url: 'http://localhost:3002/graphql' }],
                    pollIntervalInMs: 10_000,
                    subgraphHealthCheck: true,
                }),
            },
        }),
    ],
})
export class AppModule {
}
