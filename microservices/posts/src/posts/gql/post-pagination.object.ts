import { Post } from '@app/posts/gql/post.object';
import { ObjectType } from '@nestjs/graphql';
import { GraphqlPaginationObject } from '@app/utils/pagination/graphql-pagination.object';

@ObjectType()
export class PostPagination extends GraphqlPaginationObject({
    dataType: Post,
}) {}
