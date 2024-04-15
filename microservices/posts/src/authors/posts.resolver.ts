import { Post } from '@app/posts/gql/post.object';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Author } from '@app/authors/gql/author.object';
import { AuthorsService } from '@app/authors/authors.service';

@Resolver(() => Post)
export class PostsResolver {
    constructor(private readonly authorsService: AuthorsService) {
    }

    @ResolveField(() => Author)
    async author(@Parent() post: Post): Promise<Author> {
        return this.authorsService.getById(post.authorId);
    }
}
