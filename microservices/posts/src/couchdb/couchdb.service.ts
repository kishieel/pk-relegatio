import { CouchdbConfig, CouchdbConfigKey } from '@app/configs/couchdb.config';
import { Inject, Injectable } from '@nestjs/common';
import * as nano from 'nano';
import { ServerScope } from 'nano';

/**
 * Hmm... in CouchDB database seems to be equivalent to SQL's table not database,
 * so I rather cannot have separate database per service. I may prefix each database
 * with service name, if no other solution is found. Otherwise, I may keep documents
 * of different structure in the same database dedicated to a single service.
 * I don't like the last solution though as it will be a mess in TypeScript.
 *
 * CouchDB databases have to be created somehow in similar way to Prisma migrations
 * as when they do not exist, the service will not work. Here I may consider using some
 * custom-made migration system or just create them "manually" from Helm chart level.
 */

const NANO_PROXY_HANDLER: ProxyHandler<CouchdbService> = {
    has: (target: CouchdbService, p: PropertyKey) => Reflect.has(target.nano, p),
    get: (target: CouchdbService, p: PropertyKey) => Reflect.get(target.nano, p, target.nano),
    set: (target: CouchdbService, p: PropertyKey, value: any) => Reflect.set(target.nano, p, value, target.nano),
};

@Injectable()
export class CouchdbService {
    readonly nano: ServerScope;

    use: ServerScope['use'];
    scope: ServerScope['scope'];
    request: ServerScope['request'];
    relax: ServerScope['relax'];
    dinosaur: ServerScope['dinosaur'];
    auth: ServerScope['auth'];
    session: ServerScope['session'];
    updates: ServerScope['updates'];
    uuids: ServerScope['uuids'];
    info: ServerScope['info'];

    constructor(
        @Inject(CouchdbConfigKey)
        private readonly options: CouchdbConfig,
    ) {
        this.nano = nano(options.url);
        return new Proxy(this, NANO_PROXY_HANDLER);
    }
}
