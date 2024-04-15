import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlContext } from '@lib/types/gql-context.type';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const gqlContext = GqlExecutionContext.create(context);
        const ctx = gqlContext.getContext<GqlContext | null>();
        return ctx && !!ctx.user;
    }
}
