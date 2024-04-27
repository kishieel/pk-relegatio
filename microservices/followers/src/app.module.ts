import { Module } from '@nestjs/common';
import { GraphqlModule } from '@app/modules/graphql.module';
import { RabbitModule } from '@app/modules/rabbit.module';
import { UsersModule } from '@app/users/users.module';
import { ConfigModule } from '@app/configs/config.module';
import { CouchdbModule } from '@app/couchdb/couchdb.module';

@Module({
    imports: [GraphqlModule, RabbitModule, ConfigModule, CouchdbModule, UsersModule],
})
export class AppModule {}
