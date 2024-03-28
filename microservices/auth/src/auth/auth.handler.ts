import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventType } from '@kishieel/relegatio-messaging';
import { UserCreatedPayload } from '@kishieel/relegatio-messaging/dist/payloads/user-created.payload';

@Controller()
export class AuthHandler {
    private readonly logger = new Logger(AuthHandler.name);

    @EventPattern(EventType.UserCreated)
    async foo(@Payload() payload: UserCreatedPayload) {
        this.logger.log(JSON.stringify(payload));
    }
}
