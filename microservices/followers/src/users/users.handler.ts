import { Controller } from '@nestjs/common';
import { EventContent, EventType } from '@kishieel/relegatio-messaging';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UsersService } from '@app/users/users.service';

@Controller()
export class UsersHandler {
    constructor(private readonly usersService: UsersService) {}

    @EventPattern(EventType.UserRegistered)
    async onUserRegistered(@Payload() payload: EventContent<EventType.UserRegistered>) {
        await this.usersService.create(payload);
    }

    @EventPattern(EventType.UserUpdated)
    async onUserUpdated(@Payload() payload: EventContent<EventType.UserUpdated>) {
        await this.usersService.update(payload);
    }

    @EventPattern(EventType.UserDeleted)
    async onUserDeleted(@Payload() payload: EventContent<EventType.UserDeleted>) {
        await this.usersService.delete(payload);
    }
}
