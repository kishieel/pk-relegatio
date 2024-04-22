import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PaginationFilterByOperator } from './graphql-pagination.enums';
import {
    GraphqlFilters,
    GraphqlPaginationInputArgs,
    GraphqlPaging,
    GraphqlSorts,
} from '@app/utils/pagination/graphql-pagination.types';
import { PaginationOrderByDirection } from '@app/utils/pagination/graphql-pagination.enums';
import { GraphqlPaginator } from '@app/utils/pagination/graphql-paginator';

export const GraphqlPaginationInput = <DATA, ORDER, FILTER, PAGING extends 'offset' | 'cursor'>(
    args: GraphqlPaginationInputArgs<DATA, ORDER, FILTER, PAGING>,
) => {
    @InputType(`${args.dataType.name}PaginationOrderByInput`)
    class PaginationOrderByInput {
        @Field(() => args.orderByType)
        field: ORDER;

        @Field(() => PaginationOrderByDirection)
        direction: PaginationOrderByDirection;
    }

    @InputType(`${args.dataType.name}PaginationFilterByInput`)
    class PaginationFilterByInput {
        @Field(() => args.filterByType)
        field: FILTER;

        @Field(() => String)
        value: string;

        @Field(() => PaginationFilterByOperator, { nullable: true, defaultValue: 'eq' })
        operator: PaginationFilterByOperator;
    }

    @InputType(`${args.dataType.name}PaginationPagingInput`)
    class PaginationOffsetPagingInput {
        @Field(() => Int, { nullable: true })
        @IsOptional()
        offset?: number;

        @Field(() => Int, { nullable: true })
        @IsOptional()
        limit?: number;
    }

    @InputType(`${args.dataType.name}PaginationPagingInput`)
    class PaginationCursorPagingInput {
        @Field(() => String, { nullable: true })
        @IsOptional()
        after?: string;

        @Field(() => String, { nullable: true })
        @IsOptional()
        before?: string;

        @Field(() => Int, { nullable: true })
        @IsOptional()
        first?: number;

        @Field(() => Int, { nullable: true })
        @IsOptional()
        last?: number;
    }

    const PaginationPagingInput =
        args.pagingType === 'offset'
            ? PaginationOffsetPagingInput
            : args.pagingType === 'cursor'
              ? PaginationCursorPagingInput
              : null;
    type PaginationPagingInput = typeof args.pagingType extends 'offset'
        ? PaginationOffsetPagingInput
        : typeof args.pagingType extends 'cursor'
          ? PaginationCursorPagingInput
          : never;

    @InputType()
    class PaginationInput
        extends GraphqlPaginator
        implements GraphqlPaging<PAGING>, GraphqlSorts<ORDER>, GraphqlFilters<FILTER>
    {
        @Field(() => PaginationPagingInput, {
            nullable: true,
        })
        @IsOptional()
        paging?: PaginationPagingInput;

        @Field(() => [PaginationOrderByInput], { nullable: true })
        @IsOptional()
        orderBy?: PaginationOrderByInput[];

        @Field(() => [PaginationFilterByInput], { nullable: true })
        @IsOptional()
        filterBy?: PaginationFilterByInput[];
    }

    return PaginationInput;
};
