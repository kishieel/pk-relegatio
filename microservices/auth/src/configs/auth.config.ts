import { ConfigType, registerAs } from '@nestjs/config';

export const AuthConfigToken = 'AUTH_CONFIG';

export const authConfig = registerAs(AuthConfigToken, () => ({
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
}));

export const AuthConfigKey = authConfig.KEY;
export type AuthConfig = ConfigType<typeof authConfig>;
