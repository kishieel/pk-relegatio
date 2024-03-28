import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GraphQLDateTimeISO, GraphQLUUID } from 'graphql-scalars';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { AuthModule } from '@app/auth/auth.module';
import { BindingsModule, Eventbus, MessagingModule, Queue } from '@kishieel/relegatio-messaging';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: {
                federation: 2,
                path: join(process.cwd(), 'graphql/schema.graphql'),
            },
            sortSchema: true,
            playground: false,
            buildSchemaOptions: {
                orphanedTypes: [],
            },
            resolvers: {
                [GraphQLUUID.name]: GraphQLUUID,
                [GraphQLDateTimeISO.name]: GraphQLDateTimeISO,
            },
            csrfPrevention: false,
            plugins: [ApolloServerPluginInlineTrace()],
        }),
        BindingsModule.forRootAsync({
            useFactory: () => {
                // @todo: fix hardcoded config
                return {
                    httpUrl: 'http://user:admin@rabbit:15672',
                    eventbus: Eventbus.Internal,
                    queue: Queue.Auth,
                };
            },
        }),
        MessagingModule.forRootAsync({
            useFactory: () => {
                // @todo: fix hardcoded config
                return { rmqUrl: 'amqp://user:admin@rabbit:5672' };
            },
        }),
        AuthModule,
    ],
})
export class AppModule {}
