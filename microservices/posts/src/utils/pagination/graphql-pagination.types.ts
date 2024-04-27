export interface ClassType<T> {
    new (...args: any[]): T;
}

export interface EnumType<T> {
    [key: string]: T;
}

export interface GraphqlPaging {
    paging?: {
        offset?: number;
        limit?: number;
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

export interface GraphqlPaginationInputArgs<DATA, ORDER, FILTER> {
    dataType: ClassType<DATA>;
    orderByType: EnumType<ORDER>;
    filterByType: EnumType<FILTER>;
}

export interface GraphqlPaginationObjectArgs<DATA> {
    dataType: ClassType<DATA>;
}
