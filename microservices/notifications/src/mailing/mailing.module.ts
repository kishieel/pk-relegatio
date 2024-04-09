
import { Module } from '@nestjs/common';
import { MailingHandler } from '@app/mailing/mailing.handler';
import { MailingService } from '@app/mailing/mailing.service';

@Module({
    controllers: [MailingHandler],
    providers: [MailingService],
})
export class MailingModule {}
