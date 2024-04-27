import { GraphqlFilters, GraphqlPaging, GraphqlSorts } from '@app/utils/pagination/graphql-pagination.types';
import { MangoSelector, SortOrder } from 'nano';
import { PaginationFilterByOperator, PaginationOrderByDirection } from '@app/utils/pagination/graphql-pagination.enums';
import { Maybe } from '@apollo/federation';

export class GraphqlPaginator {
    static DEFAULT_OFFSET = 0;
    static DEFAULT_LIMIT = 10;

    static getPaging(input: GraphqlPaging): GraphqlPaging['paging'] {
        return {
            offset: input.paging?.offset ?? this.DEFAULT_OFFSET,
            limit: input.paging?.limit ?? this.DEFAULT_LIMIT,
        };
    }

    static getFilters(input: GraphqlFilters): Maybe<MangoSelector[]> {
        return input.filterBy?.reduce((acc, filter) => {
            let condition: MangoSelector;

            switch (filter.operator) {
                case PaginationFilterByOperator.EQ:
                    condition = { $eq: filter.value };
                    break;
                case PaginationFilterByOperator.NE:
                    condition = { $ne: filter.value };
                    break;
                case PaginationFilterByOperator.LT:
                    condition = { $lt: filter.value };
                    break;
                case PaginationFilterByOperator.LTE:
                    condition = { $lte: filter.value };
                    break;
                case PaginationFilterByOperator.GT:
                    condition = { $gt: filter.value };
                    break;
                case PaginationFilterByOperator.GTE:
                    condition = { $gte: filter.value };
                    break;
                case PaginationFilterByOperator.LIKE:
                    condition = { $regex: `(?i)${filter.value}` };
                    break;
                case PaginationFilterByOperator.NLIKE:
                    condition = { $regex: `^(?i)(?!.*${filter.value})` };
                    break;
                case PaginationFilterByOperator.IN:
                    condition = { $in: filter.value.split('\0\0') };
                    break;
                case PaginationFilterByOperator.NIN:
                    condition = { $nin: filter.value.split('\0\0') };
                    break;

                default:
                    condition = { $eq: filter.value };
            }

            if (filter.field === 'any') {
                const $or: MangoSelector[] = [];

                $or.push({ title: condition });
                $or.push({ slug: condition });

                acc.push({ $or });
            } else {
                acc.push({ [filter.field]: condition });
            }

            return acc;
        }, [] as MangoSelector[]);
    }

    static getSorts(input: GraphqlSorts): Maybe<SortOrder[]> {
        return input.orderBy?.map((order) => ({
            [order.field]: order.direction === PaginationOrderByDirection.ASC ? 'asc' : 'desc',
        }));
    }

    static encodeCursor<T>(cursor: T): string {
        return btoa(JSON.stringify(cursor));
    }

    static decodeCursor<T>(cursor: string): T {
        return atob(JSON.parse(cursor)) as T;
    }

    static create<T, R>(data: T[], paging: GraphqlPaging['paging'], map: (item: T) => R) {
        return {
            data: data.slice(0, paging.limit).map(map),
            pageInfo: {
                offset: paging.offset,
                limit: paging.limit,
                hasNextPage: data.length > paging.limit,
                hasPrevPage: paging.offset > 0,
            },
        };
    }
}
