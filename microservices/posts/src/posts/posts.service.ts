import { Injectable } from '@nestjs/common';
import { Post } from '@app/posts/gql/post.object';

@Injectable()
export class PostsService {
    async getPaginated(): Promise<Post[]> {
        return [
            {
                uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
                title: 'Hello, World!',
                slug: 'hello-world-4719729',
                content: 'Hello, World! This is a post.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }
}
