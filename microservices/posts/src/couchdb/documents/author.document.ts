import { MaybeDocument } from 'nano';

export interface IAuthorDocument extends MaybeDocument {
    username: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

export class AuthorDocument implements IAuthorDocument {
    constructor(
        public username: string,
        public firstName: string,
        public lastName: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
