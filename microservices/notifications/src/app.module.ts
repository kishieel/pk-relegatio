import { Module } from '@nestjs/common';
import { MailingModule } from '@app/mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BindingsModule, Eventbus, MessagingModule, Queue } from '@kishieel/relegatio-messaging';
import { join } from 'path';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'mailpit-smtp',
                port: 25,
                ignoreTLS: true,
                secure: false,
                auth: {
                    user: null,
                    pass: null,
                },
            },
            defaults: {
                from: '"No Reply" <no-reply@relegatio.localhost>',
            },
            template: {
                dir: join(__dirname, '..', 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        BindingsModule.forRootAsync({
            useFactory: () => {
                // @todo: fix hardcoded config
                return {
                    httpUrl: 'http://admin:admin@rabbit:15672',
                    eventbus: Eventbus.Internal,
                    queue: Queue.Notifications,
                };
            },
        }),
        MessagingModule.forRootAsync({
            useFactory: () => {
                // @todo: fix hardcoded config
                return { rmqUrl: 'amqp://admin:admin@rabbit:5672' };
            },
        }),
        MailingModule,
    ],
})
export class AppModule {}
