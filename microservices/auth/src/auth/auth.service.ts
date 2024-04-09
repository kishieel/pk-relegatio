import { AuthToken } from '@app/auth/gql/auth-token.object';
import { SignUpInput } from '@app/auth/gql/sign-up.input';
import { SignInInput } from '@app/auth/gql/sign-in.input';
import { RefreshTokenInput } from '@app/auth/gql/refresh-token.input';
import { Eventbus, EventContent, EventType, MessagingService } from '@kishieel/relegatio-messaging';
import { Inject } from '@nestjs/common';

export class AuthService {
    constructor(
        @Inject(Eventbus.Internal)
        private readonly eventbus: MessagingService,
    ) {}

    async signUp(input: SignUpInput): Promise<AuthToken> {
        const user: EventContent<EventType.UserRegistered> = {
            uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            username: input.username,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.eventbus.emit(EventType.UserRegistered, user);

        [input];
        return {
            accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        };
    }

    async signIn(input: SignInInput): Promise<AuthToken> {
        [input];
        return {
            accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        };
    }

    async refreshToken(input: RefreshTokenInput): Promise<AuthToken> {
        [input];
        return {
            accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        };
    }
}
