import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Max, Min, ValidateNested } from 'class-validator';
import { PaginationFilterByOperator } from './graphql-pagination.enums';
import {
    GraphqlFilters,
    GraphqlPaginationInputArgs,
    GraphqlPaging,
    GraphqlSorts,
} from '@app/utils/pagination/graphql-pagination.types';
import { PaginationOrderByDirection } from '@app/utils/pagination/graphql-pagination.enums';
import { Type } from 'class-transformer';

export const GraphqlPaginationInput = <DATA, ORDER, FILTER>(args: GraphqlPaginationInputArgs<DATA, ORDER, FILTER>) => {
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
    class PaginationCursorPagingInput {
        @Field(() => Int, { nullable: true })
        @IsOptional()
        @Min(0)
        offset?: number;

        @Field(() => Int, { nullable: true })
        @IsOptional()
        @Min(1)
        @Max(100)
        limit?: number;
    }

    @InputType()
    class PaginationInput implements GraphqlPaging, GraphqlSorts<ORDER>, GraphqlFilters<FILTER> {
        @Field(() => PaginationCursorPagingInput, { nullable: true })
        @IsOptional()
        @ValidateNested()
        @Type(() => PaginationCursorPagingInput)
        paging?: PaginationCursorPagingInput;

        @Field(() => [PaginationOrderByInput], { nullable: true })
        @IsOptional()
        @ValidateNested({ each: true })
        @Type(() => PaginationOrderByInput)
        orderBy?: PaginationOrderByInput[];

        @Field(() => [PaginationFilterByInput], { nullable: true })
        @IsOptional()
        @ValidateNested({ each: true })
        @Type(() => PaginationFilterByInput)
        filterBy?: PaginationFilterByInput[];
    }

    return PaginationInput;
};
