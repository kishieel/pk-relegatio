import { AuthResolver } from '@app/auth/auth.resolver';
import { AuthService } from '@app/auth/auth.service';
import { Module } from '@nestjs/common';
import { AuthHandler } from '@app/auth/auth.handler';

@Module({
    controllers: [AuthHandler],
    providers: [AuthResolver, AuthService],
})
export class AuthModule {}
