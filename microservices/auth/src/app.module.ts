import { Module } from '@nestjs/common';
import { AuthModule } from '@app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/prisma/prisma.module';
import { GraphqlModule } from '@app/modules/graphql.module';
import { RabbitModule } from '@app/modules/rabbit.module';
import { TokensModule } from '@app/tokens/tokens.module';

@Module({
    imports: [GraphqlModule, RabbitModule, ConfigModule, PrismaModule, AuthModule, TokensModule],
})
export class AppModule {}
