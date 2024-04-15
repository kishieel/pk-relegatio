import { Inject, Injectable } from '@nestjs/common';
import { CouchdbService } from '@app/couchdb/couchdb.factory';
import { EventContent, EventType } from '@kishieel/relegatio-messaging';
import { AuthorDocument } from '@app/couchdb/documents/author.document';


@Injectable()
export class UsersService {
    constructor(
        @Inject(CouchdbService)
        private readonly couchdbService: CouchdbService,
    ) {
    }


    async create(payload: EventContent<EventType.UserRegistered>): Promise<void> {
        await this.couchdbService.use<AuthorDocument>('authors').insert({
            _id: payload.id,
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async update(payload: EventContent<EventType.UserUpdated>): Promise<void> {
        // @todo: check how this will behave when there is no revision
        await this.couchdbService.use<AuthorDocument>('authors').insert({
            _id: payload.id,
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async delete(payload: EventContent<EventType.UserDeleted>): Promise<void> {
        // @todo: check how this will behave when there is no revision
        await this.couchdbService.use<AuthorDocument>('authors').destroy(payload.id, '*');
    }
}
