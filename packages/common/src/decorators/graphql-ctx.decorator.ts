import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlContext } from '@lib/types/gql-context.type';

export const GraphqlCtx = createParamDecorator<{ failSafe: boolean }, ExecutionContext, GqlContext>((data, context) => {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext<GqlContext | null>();

    if (ctx === null && !data?.failSafe) {
        throw new UnauthorizedException('Invalid or expired token');
    }

    return ctx;
});
