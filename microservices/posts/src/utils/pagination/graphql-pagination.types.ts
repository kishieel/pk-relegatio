export interface ClassType<T> {
    new (...args: any[]): T;
}

export interface EnumType<T> {
    [key: string]: T;
}

export interface GraphqlPaging<T extends 'offset' | 'cursor'> {
    paging?: T extends 'offset'
        ? { offset?: number; limit?: number }
        : {
              first?: number;
              last?: number;
              after?: string;
              before?: string;
          };
}

export interface GraphqlFilters<T = string> {
    filterBy?: {
        field: T;
        value: string;
        operator?: string;
    }[];
}

export interface GraphqlSorts<T = string> {
    orderBy?: {
        field: T;
        direction: string;
    }[];
}

export interface GraphqlPaginationInputArgs<DATA, ORDER, FILTER, PAGING extends 'offset' | 'cursor'> {
    dataType: ClassType<DATA>;
    orderByType: EnumType<ORDER>;
    filterByType: EnumType<FILTER>;
    pagingType: PAGING;
}

export interface GraphqlPaginationObjectArgs<DATA> {
    dataType: ClassType<DATA>;
}
