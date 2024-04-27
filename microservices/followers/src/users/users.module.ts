import { Module } from '@nestjs/common';
import { UsersHandler } from '@app/users/users.handler';
import { UsersService } from '@app/users/users.service';

@Module({
    controllers: [UsersHandler],
    providers: [UsersService],
})
export class UsersModule {}
