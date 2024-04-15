import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from '@app/posts/gql/post.object';
import { PostsService } from '@app/posts/posts.service';
import { PostCreateInput } from '@app/posts/gql/post-create.input';
import { PostUpdateInput } from '@app/posts/gql/post-update.input';
import { AuthGuard, GqlContext, GraphqlCtx } from '@kishieel/relegatio-common';
import { UseGuards } from '@nestjs/common';
import { GraphQLCuid } from 'graphql-scalars';

@Resolver(() => Post)
export class PostsResolver {
    constructor(private readonly postsService: PostsService) {}

    @Query(() => [Post])
    async posts(): Promise<Post[]> {
        return this.postsService.getPaginated();
    }

    @Query(() => Post)
    async post(@Args('id', { type: () => GraphQLCuid }) id: string): Promise<Post> {
        return this.postsService.getById(id);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Post)
    async postCreate(@Args('input') input: PostCreateInput, @GraphqlCtx() context: GqlContext): Promise<Post> {
        return this.postsService.create({ ...input, authorId: context.user.id });
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Post)
    async postUpdate(
        @Args('id', { type: () => GraphQLCuid }) id: string,
        @Args('input') input: PostUpdateInput,
        @GraphqlCtx() context: GqlContext,
    ): Promise<Post> {
        return this.postsService.update({ ...input, id, authorId: context.user.id });
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Boolean)
    async postDelete(@Args('id', { type: () => GraphQLCuid }) id: string): Promise<boolean> {
        return this.postsService.delete(id);
    }
}
