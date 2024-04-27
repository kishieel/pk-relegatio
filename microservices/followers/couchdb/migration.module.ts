import { ConfigModule } from '@app/configs/config.module';
import { Module } from '@nestjs/common';
import { CouchdbModule } from '@app/couchdb/couchdb.module';
import { MigrationService } from '@couchdb/migration.service';

@Module({
    imports: [ConfigModule, CouchdbModule],
    providers: [MigrationService],
})
export class MigrationModule {}
