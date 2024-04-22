import { GraphqlPaginationObjectArgs } from '@app/utils/pagination/graphql-pagination.types';
import { Field, ObjectType } from '@nestjs/graphql';

export const GraphqlPaginationObject = <DATA>(args: GraphqlPaginationObjectArgs<DATA>) => {
    @ObjectType(`${args.dataType.name}PaginationMeta`)
    class PaginationInfoObject {
        @Field(() => String, { nullable: true })
        firstCursor?: string;

        @Field(() => String, { nullable: true })
        lastCursor?: string;

        @Field(() => Boolean)
        hasNextPage: boolean;

        @Field(() => Boolean)
        hasPrevPage: boolean;

        @Field(() => Number)
        total: number;

        @Field(() => Number)
        count: number;
    }

    @ObjectType(`${args.dataType.name}PaginationEdge`)
    class PaginationEdgeObject {
        @Field(() => args.dataType)
        node: DATA;

        @Field(() => String)
        cursor: string;
    }

    @ObjectType(`${args.dataType.name}Pagination`)
    class PaginationObject {
        @Field(() => [PaginationEdgeObject])
        edges: PaginationEdgeObject[];

        @Field(() => PaginationInfoObject)
        info: PaginationInfoObject;
    }

    return PaginationObject;
};
