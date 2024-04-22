import { InputType } from '@nestjs/graphql';
import { Author } from '@app/authors/gql/author.object';
import { GraphqlPaginationInput } from '@app/utils/pagination/graphql-pagination.input';

export enum AuthorOrderBy {
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
}

export enum AuthorFilterBy {
    ANY = 'any',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
}

@InputType()
export class AuthorPaginationInput extends GraphqlPaginationInput({
    dataType: Author,
    orderByType: AuthorOrderBy,
    filterByType: AuthorFilterBy,
    pagingType: 'offset',
}) {}
