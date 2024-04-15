import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Post } from '@app/posts/gql/post.object';
import { PostCreateArgs, PostUpdateArgs } from '@app/posts/post.interfaces';
import { CouchdbService } from '@app/couchdb/couchdb.factory';
import { IPostDocument, PostDocument } from '@app/couchdb/documents/post.document';
import { slugify } from '@app/utils/slugify.function';
import { throwIf } from '@kishieel/relegatio-common';
import * as cuid from 'cuid';
import * as lodash from 'lodash';

@Injectable()
export class PostsService {
    constructor(
        @Inject(CouchdbService)
        private readonly couchdbService: CouchdbService,
    ) {}

    async getPaginated(): Promise<Post[]> {
        const list = await this.couchdbService.use<IPostDocument>('posts').list({ include_docs: true });

        return list.rows.map((row) => PostDocument.toGraphql(row.doc));
    }

    async getById(id: string): Promise<Post> {
        const post = await this.couchdbService.use<IPostDocument>('posts').get(id);

        return PostDocument.toGraphql(post);
    }

    async getByAuthorUuid(authorUuid: string): Promise<Post[]> {
        return [
            {
                id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
                authorId: authorUuid,
                title: 'Hello, World!',
                slug: 'hello-world-4719729',
                content: 'Hello, World! This is a after update.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }

    async create(args: PostCreateArgs): Promise<Post> {
        const { id, rev } = await this.couchdbService.use<IPostDocument>('posts').insert(
            new PostDocument({
                _id: cuid(),
                title: args.title,
                slug: slugify(args.title, 48),
                content: args.content,
                authorId: args.authorId,
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        );

        const post = await this.couchdbService.use<IPostDocument>('posts').get(id, { rev });

        return PostDocument.toGraphql(post);
    }

    async update(args: PostUpdateArgs): Promise<Post> {
        const post = await this.couchdbService.use<IPostDocument>('posts').get(args.id);
        throwIf(post.authorId !== args.authorId, new ForbiddenException('You are not allowed to update this post.'));

        const { id, rev } = await this.couchdbService.use<IPostDocument>('posts').insert(
            lodash.merge(post, {
                title: args.title,
                slug: args ? slugify(args.title, 48) : undefined,
                content: args.content,
                updatedAt: new Date(),
            }),
        );
        const post2 = await this.couchdbService.use<IPostDocument>('posts').get(id, { rev });

        return PostDocument.toGraphql(post2);
    }

    async delete(id: string): Promise<boolean> {
        await this.couchdbService.use('posts').destroy(id, '*');
        return true;
    }
}
