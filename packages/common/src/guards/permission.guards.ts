import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { JwtContent } from '@lib/types/jwt-content.type';

export const HasAllPermissions = (perms: string[]) => {
    return mixin(
        class implements CanActivate {
            canActivate(context: ExecutionContext): boolean {
                const request = context.switchToHttp().getRequest<{ headers: { [k: string]: string } }>();
                const auth: JwtContent = JSON.parse(request.headers['x-internal']);
                return perms.every((perm) => auth.user.permissions.includes(perm));
            }
        },
    );
};

export const HasAnyPermissions = (perms: string[]) => {
    return mixin(
        class implements CanActivate {
            canActivate(context: ExecutionContext): boolean {
                const request = context.switchToHttp().getRequest<{ headers: { [k: string]: string } }>();
                const auth: JwtContent = JSON.parse(request.headers['x-internal']);
                return perms.some((perm) => auth.user.permissions.includes(perm));
            }
        },
    );
};
