import { Global, Module } from '@nestjs/common';
import { CouchdbService } from '@app/couchdb/couchdb.service';

@Global()
@Module({
    providers: [CouchdbService],
    exports: [CouchdbService],
})
export class CouchdbModule {}
