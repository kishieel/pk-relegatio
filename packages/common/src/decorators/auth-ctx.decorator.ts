import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtContent } from '@lib/types/jwt-content.type';

export const AuthCtx = createParamDecorator<{ failSafe: boolean }, ExecutionContext, JwtContent>((data, context) => {
    const request = context.switchToHttp().getRequest<{ headers: { [k: string]: string } }>();
    let auth: JwtContent | null;

    try {
        auth = JSON.parse(request.headers['x-internal']);
    } catch (e) {
        auth = null;
    }

    if (auth === null && !data?.failSafe) {
        throw new UnauthorizedException('Invalid or expired token');
    }

    return auth;
});
