import { EventType } from '@lib/consts/event-type.enum';
import { UserUpdatedPayload } from '@lib/payloads/user-updated.payload';
import { UserDeletedPayload } from '@lib/payloads/user-deleted.payload';
import { UserRegisteredPayload } from '@lib/payloads/user-registered.payload';

export type EventPayloadMap = {
    [EventType.UserUpdated]: UserUpdatedPayload;
    [EventType.UserDeleted]: UserDeletedPayload;
    [EventType.UserRegistered]: UserRegisteredPayload;
};
