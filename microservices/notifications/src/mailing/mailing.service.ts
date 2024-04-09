import { EventContent, EventType } from '@kishieel/relegatio-messaging';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
    constructor(private readonly mailerService: MailerService) {}

    async dispatchVerificationEmail(payload: EventContent<EventType.UserRegistered>): Promise<void> {
        await this.mailerService.sendMail({
            to: payload.username,
            subject: 'Welcome to our platform!',
            template: 'verification',
            context: {
                username: payload.username,
            },
        });
    }
}
