import { ConfigType, registerAs } from '@nestjs/config';
import { IntrospectAndCompose } from '@apollo/gateway';
import { AuthenticatedDataSource } from '@app/data-source/authenticated-data-source';

export const GatewayConfigToken = 'GATEWAY_CONFIG';

export const gatewayConfig = registerAs(GatewayConfigToken, () => ({
    server: {
        playground: true,
    },
    gateway: {
        debug: process.env.NODE_ENV !== 'production',
        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'auth', url: process.env.AUTH_GRAPHQL_URL },
                { name: 'posts', url: process.env.POSTS_GRAPHQL_URL },
            ],
            pollIntervalInMs: 10_000,
            subgraphHealthCheck: true,
        }),
    },
}));

export const GatewayConfigKey = gatewayConfig.KEY;
export type GatewayConfig = ConfigType<typeof gatewayConfig>;
