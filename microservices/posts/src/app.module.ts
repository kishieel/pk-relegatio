import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLDateTimeISO, GraphQLUUID } from 'graphql-scalars';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';

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
            plugins: [ApolloServerPluginInlineTrace()],
        }),
        PostsModule,
    ],
})
export class AppModule {
}
