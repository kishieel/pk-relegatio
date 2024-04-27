import { GraphqlPaginationObjectArgs } from '@app/utils/pagination/graphql-pagination.types';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphqlPaginator } from '@app/utils/pagination/graphql-paginator';

export const GraphqlPaginationObject = <DATA>(args: GraphqlPaginationObjectArgs<DATA>) => {
    @ObjectType(`${args.dataType.name}PaginationPageInfo`)
    class PaginationInfoObject {
        @Field(() => Int)
        offset: number;

        @Field(() => Int)
        limit: number;

        @Field(() => Boolean)
        hasNextPage: boolean;

        @Field(() => Boolean)
        hasPrevPage: boolean;
    }

    @ObjectType(`${args.dataType.name}Pagination`)
    class PaginationObject extends GraphqlPaginator {
        @Field(() => [args.dataType])
        data: DATA[];

        @Field(() => PaginationInfoObject)
        pageInfo: PaginationInfoObject;
    }

    return PaginationObject;
};
