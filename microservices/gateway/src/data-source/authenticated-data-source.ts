import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { GraphQLDataSourceProcessOptions } from '@apollo/gateway/src/datasources/types';
import { MessagingService, RpcType } from '@kishieel/relegatio-messaging';
import { firstValueFrom } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    constructor(
        config: ConstructorParameters<typeof RemoteGraphQLDataSource>[0],
        private readonly eventbus: MessagingService,
    ) {
        super(config);
    }

    async willSendRequest(options: GraphQLDataSourceProcessOptions): Promise<void> {
        const { request, context } = options;
        request.http.headers.delete('x-internal');

        const token = context.req?.headers?.['authorization'];
        const internal = await this.getInternalContext(token);

        request.http.headers.set('x-internal', JSON.stringify(internal));
    }

    protected async getInternalContext(token: string) {
        if (typeof token !== 'string') {
            return null;
        }

        try {
            const jwt = token.replace('Bearer ', '');
            const response = await firstValueFrom(this.eventbus.send(RpcType.DecodeJwt, { jwt }));

            console.log('#1', response);

            return {
                user: response.user,
                roles: response.roles,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
