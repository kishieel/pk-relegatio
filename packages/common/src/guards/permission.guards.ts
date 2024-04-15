import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlContext } from '@lib/types/gql-context.type';

export const HasAllPermissions = (perms: string[]) => {
    return mixin(
        class implements CanActivate {
            canActivate(context: ExecutionContext): boolean {
                const gqlContext = GqlExecutionContext.create(context);
                const ctx = gqlContext.getContext<GqlContext | null>();

                const allPerms: string[] = [];
                ctx?.roles.forEach(({ permissions }) => allPerms.push(...permissions));
                allPerms.push(...ctx.user.permissions);

                return perms.every((perm) => allPerms.includes(perm));
            }
        },
    );
};

export const HasAnyPermissions = (perms: string[]) => {
    return mixin(
        class implements CanActivate {
            canActivate(context: ExecutionContext): boolean {
                const gqlContext = GqlExecutionContext.create(context);
                const ctx = gqlContext.getContext<GqlContext | null>();

                const allPerms: string[] = [];
                ctx?.roles.forEach(({ permissions }) => allPerms.push(...permissions));
                allPerms.push(...ctx.user.permissions);

                return perms.some((perm) => allPerms.includes(perm));
            }
        },
    );
};
