import { Module } from '@nestjs/common';
import { AuthorsResolver } from '@app/authors/authors.resolver';
import { AuthorsService } from '@app/authors/authors.service';
import { PostsResolver } from '@app/authors/posts.resolver';

@Module({
    providers: [AuthorsService, AuthorsResolver, PostsResolver],
})
export class AuthorsModule {}
