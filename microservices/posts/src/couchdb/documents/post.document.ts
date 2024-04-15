import { MaybeDocument } from 'nano';
import { Post } from '@app/posts/gql/post.object';
import * as lodash from 'lodash';

export interface IPostDocument extends MaybeDocument {
    title: string;
    slug: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class PostDocument implements IPostDocument {
    public _id?: string;
    public _rev?: string;
    public title: string;
    public slug: string;
    public content: string;
    public authorId: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(args: IPostDocument) {
        this._id = args._id;
        this._rev = args._rev;
        this.title = args.title;
        this.slug = args.slug;
        this.content = args.content;
        this.authorId = args.authorId;
        this.createdAt = args.createdAt;
        this.updatedAt = args.updatedAt;
    }

    static toGraphql(post: IPostDocument): Post {
        return {
            id: post._id,
            authorId: post.authorId,
            title: post.title,
            slug: post.slug,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }
}
