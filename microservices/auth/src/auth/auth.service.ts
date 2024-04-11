import { AuthToken } from '@app/auth/gql/auth-token.object';
import { SignUpInput } from '@app/auth/gql/sign-up.input';
import { SignInInput } from '@app/auth/gql/sign-in.input';
import { RefreshTokenInput } from '@app/auth/gql/refresh-token.input';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.factory';
import { throwIf } from '@app/utils/throw-if.function';
import { hash, verify } from 'argon2';
import { AuthEmitter } from '@app/auth/auth.emitter';
import { TokensService } from '@app/tokens/tokens.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(PrismaService)
        private readonly prismaService: PrismaService,
        private readonly authEmitter: AuthEmitter,
        private readonly tokensService: TokensService,
    ) {
    }

    async signUp(input: SignUpInput): Promise<AuthToken> {
        const userExists = await this.prismaService.user.exists({ username: input.username });
        throwIf(userExists, new BadRequestException('User already exists'));

        const password = await hash(input.password);
        const user = await this.prismaService.user.create({
            data: { username: input.username, password, firstName: input.firstName, lastName: input.lastName },
        });

        await this.authEmitter.emitUserRegistered(user);

        return await this.tokensService.createAuthTokens(user);
    }

    async signIn(input: SignInInput): Promise<AuthToken> {
        const user = await this.prismaService.user.findUnique({ where: { username: input.username } });
        throwIf(!user, new UnauthorizedException('Invalid username or password'));

        const validPassword = await verify(user.password, input.password);
        throwIf(!validPassword, new UnauthorizedException('Invalid username or password'));

        return await this.tokensService.createAuthTokens(user);
    }

    async refreshToken(input: RefreshTokenInput): Promise<AuthToken> {
        const content = await this.tokensService.decodeToken(input.token);

        const user = await this.prismaService.user.findUnique({ where: { id: content.user.id } });
        throwIf(!user, new UnauthorizedException('Invalid or expired token'));

        return await this.tokensService.createAuthTokens(user);
    }
}
