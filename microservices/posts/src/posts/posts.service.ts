import { Injectable } from '@nestjs/common';
import { Post } from '@app/posts/gql/post.object';

@Injectable()
export class PostsService {
    async getPaginated(): Promise<Post[]> {
        return [
            {
                uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
                authorUuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
                title: 'Hello, World!',
                slug: 'hello-world-4719729',
                content: 'Hello, World! This is a after update.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }

    async getByAuthorUuid(authorUuid: string): Promise<Post[]> {
        return [
            {
                uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
                authorUuid: authorUuid,
                title: 'Hello, World!',
                slug: 'hello-world-4719729',
                content: 'Hello, World! This is a after update.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }
}
