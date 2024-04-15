import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CouchdbService, createCouchdbService } from '@app/couchdb/couchdb.factory';
import { CouchdbConfig, CouchdbConfigToken } from '@app/configs/couchdb.config';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: CouchdbService,
            useFactory: (configService: ConfigService) => {
                const couchdbConfig = configService.getOrThrow<CouchdbConfig>(CouchdbConfigToken);
                return createCouchdbService(couchdbConfig);
            },
            inject: [ConfigService],
        },
    ],
    exports: [CouchdbService],
})
export class CouchdbModule {

}
