import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthToken } from '@app/auth/gql/auth-token.object';
import { AuthService } from '@app/auth/auth.service';
import { SignUpInput } from '@app/auth/gql/sign-up.input';
import { SignInInput } from '@app/auth/gql/sign-in.input';
import { RefreshTokenInput } from '@app/auth/gql/refresh-token.input';
import { AuthGuard } from '@kishieel/relegatio-common';
import { UseGuards } from '@nestjs/common';


@Resolver(() => AuthToken)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {
    }

    @Mutation(() => AuthToken)
    async signUp(@Args('input') input: SignUpInput): Promise<AuthToken> {
        return this.authService.signUp(input);
    }

    @Mutation(() => AuthToken)
    async signIn(@Args('input') input: SignInInput): Promise<AuthToken> {
        return this.authService.signIn(input);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => AuthToken)
    async refreshToken(@Args('input') input: RefreshTokenInput): Promise<AuthToken> {
        return this.authService.refreshToken(input);
    }
}
