import { Injectable } from '@nestjs/common';
import { Author } from '@app/authors/gql/author.object';
import { CouchdbService } from '@app/couchdb/couchdb.service';
import { AuthorDocument, IAuthorDocument } from '@app/couchdb/documents/author.document';

@Injectable()
export class AuthorsService {
    constructor(private readonly couchdbService: CouchdbService) {}

    async getPaginated(): Promise<Author[]> {
        const authors = await this.couchdbService.use<IAuthorDocument>('authors').list({ include_docs: true });

        return authors.rows.map((row) => AuthorDocument.toGraphql(row.doc));
    }

    async getById(id: string): Promise<Author> {
        const author = await this.couchdbService.use<IAuthorDocument>('authors').get(id);

        return AuthorDocument.toGraphql(author);
    }
}
