import { ForbiddenException, Injectable } from '@nestjs/common';
import { Post } from '@app/posts/gql/post.object';
import { PostCreateArgs, PostUpdateArgs } from '@app/posts/post.interfaces';
import { IPostDocument, PostDocument } from '@app/couchdb/documents/post.document';
import { slugify } from '@app/utils/slugify.function';
import { throwIf } from '@kishieel/relegatio-common';
import { CouchdbService } from '@app/couchdb/couchdb.service';
import { PostNotFoundException } from '@app/errors/post-not-found.exception';
import { PostPaginationInput } from '@app/posts/gql/post-pagination.input';
import { PostPagination } from '@app/posts/gql/post-pagination.object';
import * as cuid from 'cuid';
import * as lodash from 'lodash';

@Injectable()
export class PostsService {
    constructor(private readonly couchdbService: CouchdbService) {}

    async getPaginated(input: PostPaginationInput): Promise<PostPagination> {
        const paging = PostPagination.getPaging(input);
        const filters = PostPagination.getFilters(input);
        const sorts = PostPagination.getSorts(input);

        const posts = await this.couchdbService.use<IPostDocument>('posts').find({
            selector: filters ? { $and: filters } : { _id: { $exists: true } },
            sort: sorts,
            skip: paging.offset,
            limit: paging.limit + 1,
        });

        return PostPagination.create(posts.docs, paging, (doc) => PostDocument.toGraphql(doc));
    }

    async getById(id: string): Promise<Post> {
        const post = await this.couchdbService.use<IPostDocument>('posts').get(id);

        return PostDocument.toGraphql(post);
    }

    async getBySlug(slug: string): Promise<Post> {
        const post = await this.couchdbService.use<IPostDocument>('posts').find({
            selector: { slug },
            limit: 1,
        });

        throwIf(post.docs.length === 0, new PostNotFoundException());

        return PostDocument.toGraphql(post.docs[0]);
    }

    async getByAuthorUuid(authorId: string): Promise<Post[]> {
        const posts = await this.couchdbService.use<IPostDocument>('posts').find({
            selector: { authorId },
        });

        return posts.docs.map((doc) => PostDocument.toGraphql(doc));
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
        const post = await this.couchdbService.use<IPostDocument>('posts').get(id);
        await this.couchdbService.use('posts').destroy(id, post._rev);

        return true;
    }
}
