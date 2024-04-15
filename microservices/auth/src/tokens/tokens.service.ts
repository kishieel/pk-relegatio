import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { AuthToken } from '@app/auth/gql/auth-token.object';
import { JwtService } from '@nestjs/jwt';
import { JwtContent } from '@kishieel/relegatio-common';
import { AuthConfig, AuthConfigKey } from '@app/configs/auth.config';

@Injectable()
export class TokensService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(AuthConfigKey)
        private readonly authConfig: AuthConfig,
    ) {}

    async createAuthTokens(user: Prisma.UserGetPayload<true>): Promise<AuthToken> {
        const jwtClaims: JwtContent = {
            user: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                permissions: [],
            },
            roles: [],
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { sub: user.id, ...jwtClaims },
                { expiresIn: this.authConfig.accessTokenExpiresIn },
            ),
            this.jwtService.signAsync(
                { sub: user.id, ...jwtClaims },
                { expiresIn: this.authConfig.refreshTokenExpiresIn },
            ),
        ]);

        return { accessToken, refreshToken };
    }

    async verifyToken(jwt: string): Promise<JwtContent> {
        try {
            return await this.jwtService.verifyAsync<JwtContent>(jwt);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
