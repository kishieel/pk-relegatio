import { Module } from '@nestjs/common';
import { TokensService } from '@app/tokens/tokens.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig, AuthConfigToken } from '@app/configs/auth.config';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                const authConfig = configService.getOrThrow<AuthConfig>(AuthConfigToken);
                return { secret: authConfig.jwtSecret };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [TokensService],
    exports: [TokensService],
})
export class TokensModule {
}
