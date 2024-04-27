import { Post } from '@app/posts/gql/post.object';
import { InputType } from '@nestjs/graphql';
import { GraphqlPaginationInput } from '@app/utils/pagination/graphql-pagination.input';

export enum PostOrderBy {
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
    TITLE = 'title',
    SLUG = 'slug',
}

export enum PostFilterBy {
    ANY = 'any',
    TITLE = 'title',
    SLUG = 'slug',
}

@InputType()
export class PostPaginationInput extends GraphqlPaginationInput({
    dataType: Post,
    orderByType: PostOrderBy,
    filterByType: PostFilterBy,
}) {}
