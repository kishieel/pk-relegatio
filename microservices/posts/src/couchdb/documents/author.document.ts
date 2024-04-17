import { MaybeDocument } from 'nano';
import { Author } from '@app/authors/gql/author.object';

export interface IAuthorDocument extends MaybeDocument {
    username: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

export class AuthorDocument implements IAuthorDocument {
    public _id?: string;
    public _rev?: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(args: IAuthorDocument) {
        this._id = args._id;
        this._rev = args._rev;
        this.username = args.username;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.createdAt = args.createdAt;
        this.updatedAt = args.updatedAt;
    }

    static toGraphql(author: IAuthorDocument): Author {
        return {
            id: author._id,
            firstName: author.firstName,
            lastName: author.lastName,
            createdAt: author.createdAt,
            updatedAt: author.updatedAt,
        };
    }
}
