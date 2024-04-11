import { AuthResolver } from '@app/auth/auth.resolver';
import { AuthService } from '@app/auth/auth.service';
import { Module } from '@nestjs/common';
import { AuthHandler } from '@app/auth/auth.handler';
import { AuthEmitter } from '@app/auth/auth.emitter';
import { TokensModule } from '@app/tokens/tokens.module';

@Module({
    imports: [TokensModule],
    controllers: [AuthHandler],
    providers: [AuthResolver, AuthService, AuthEmitter],
})
export class AuthModule {}
