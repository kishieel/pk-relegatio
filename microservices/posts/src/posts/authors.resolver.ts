import { Post } from '@app/posts/gql/post.object';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Author } from '@app/authors/gql/author.object';
import { PostsService } from '@app/posts/posts.service';

@Resolver(() => Author)
export class AuthorsResolver {
    constructor(private readonly postsService: PostsService) {}

    @ResolveField(() => [Post])
    async posts(@Parent() author: Author): Promise<Post[]> {
        return this.postsService.getByAuthorUuid(author.uuid);
    }
}
