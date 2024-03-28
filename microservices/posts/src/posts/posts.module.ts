import { Module } from '@nestjs/common';
import { PostsService } from '@app/posts/posts.service';
import { PostsResolver } from '@app/posts/posts.resolver';
import { AuthorsResolver } from '@app/posts/authors.resolver';

@Module({
    providers: [PostsService, PostsResolver, AuthorsResolver],
})
export class PostsModule {
}
