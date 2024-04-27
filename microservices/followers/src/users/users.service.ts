import { Injectable } from '@nestjs/common';
import { EventContent, EventType } from '@kishieel/relegatio-messaging';
import { CouchdbService } from '@app/couchdb/couchdb.service';

@Injectable()
export class UsersService {
    constructor(private readonly couchdbService: CouchdbService) {}

    async create(payload: EventContent<EventType.UserRegistered>): Promise<void> {
        [payload];
    }

    async update(payload: EventContent<EventType.UserUpdated>): Promise<void> {
        [payload];
    }

    async delete(payload: EventContent<EventType.UserDeleted>): Promise<void> {
        [payload];
    }
}
