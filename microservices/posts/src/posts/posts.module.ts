import { Module } from '@nestjs/common';
import { PostsService } from '@app/posts/posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
    providers: [PostsService, PostsResolver],
})
export class PostsModule {
}
