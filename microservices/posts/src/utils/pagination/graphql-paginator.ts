import { GraphqlFilters, GraphqlPaging, GraphqlSorts } from '@app/utils/pagination/graphql-pagination.types';
import { MangoSelector, SortOrder } from 'nano';
import { PaginationFilterByOperator, PaginationOrderByDirection } from '@app/utils/pagination/graphql-pagination.enums';
import { Maybe } from '@apollo/federation';

export class GraphqlPaginator {
    static getPaging(input: GraphqlPaging<'offset'>): GraphqlPaging<'offset'>['paging'];
    static getPaging(input: GraphqlPaging<'cursor'>): GraphqlPaging<'cursor'>['paging'];
    static getPaging(input: GraphqlPaging<'offset' | 'cursor'>): Maybe<GraphqlPaging<'offset' | 'cursor'>['paging']> {
        return input.paging;
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
}
