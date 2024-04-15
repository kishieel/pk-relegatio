import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLDateTimeISO, GraphQLUUID } from 'graphql-scalars';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { createSubgraphContext } from '@kishieel/relegatio-common';

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
            autoTransformHttpErrors: true,
            context: ({ req }) => createSubgraphContext(req),
        }),
    ],
})
export class GraphqlModule {
}
