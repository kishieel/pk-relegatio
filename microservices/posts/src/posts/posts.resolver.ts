import { Query, Resolver } from '@nestjs/graphql';
import { Post } from '@app/posts/gql/post.object';
import { PostsService } from '@app/posts/posts.service';

@Resolver(() => Post)
export class PostsResolver {
    constructor(private readonly postsService: PostsService) {
    }

    @Query(() => [Post])
    async posts(): Promise<Post[]> {
        return this.postsService.getPaginated();
    }
}
