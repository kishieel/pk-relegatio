import { Eventbus, EventContent, EventType, MessagingService } from '@kishieel/relegatio-messaging';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthEmitter {
    constructor(
        @Inject(Eventbus.Internal)
        private readonly eventbus: MessagingService,
    ) {}

    async emitUserRegistered(user: Prisma.UserGetPayload<true>): Promise<void> {
        const payload: EventContent<EventType.UserRegistered> = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        this.eventbus.emit(EventType.UserRegistered, payload);
    }
}
