import { Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLCuid, GraphQLDateTimeISO } from 'graphql-scalars';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { createSubgraphContext } from '@kishieel/relegatio-common';
import { PostFilterBy, PostOrderBy } from '@app/posts/gql/post-pagination.input';
import { AuthorFilterBy, AuthorOrderBy } from '@app/authors/gql/author-pagination.input';
import { PaginationFilterByOperator, PaginationOrderByDirection } from '@app/utils/pagination/graphql-pagination.enums';

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
                [GraphQLCuid.name]: GraphQLCuid,
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
    constructor() {
        registerEnumType(PaginationFilterByOperator, { name: 'PaginationFilterByOperator' });
        registerEnumType(PaginationOrderByDirection, { name: 'PaginationOrderByDirection' });
        registerEnumType(PostOrderBy, { name: 'PostOrderBy' });
        registerEnumType(PostFilterBy, { name: 'PostFilterBy' });
        registerEnumType(AuthorOrderBy, { name: 'AuthorOrderBy' });
        registerEnumType(AuthorFilterBy, { name: 'AuthorFilterBy' });
    }
}
