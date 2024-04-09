import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventContent, EventType } from '@kishieel/relegatio-messaging';
import { MailingService } from '@app/mailing/mailing.service';

@Controller()
export class MailingHandler {
    private readonly logger = new Logger(MailingHandler.name);

    constructor(private readonly mailingService: MailingService) {}

    @EventPattern(EventType.UserRegistered)
    async onUserRegistered(@Payload() payload: EventContent<EventType.UserRegistered>) {
        this.logger.log(`Received event: ${JSON.stringify(payload)}`);

        return this.mailingService.dispatchVerificationEmail(payload);
    }
}
