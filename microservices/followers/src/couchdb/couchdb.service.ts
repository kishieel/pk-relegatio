import { CouchdbConfig, CouchdbConfigKey } from '@app/configs/couchdb.config';
import { Inject, Injectable } from '@nestjs/common';
import * as nano from 'nano';
import { ServerScope } from 'nano';

const NANO_PROXY_HANDLER: ProxyHandler<CouchdbService> = {
    has: (target: CouchdbService, p: PropertyKey) => Reflect.has(target.nano, p),
    get: (target: CouchdbService, p: PropertyKey) => Reflect.get(target.nano, p, target.nano),
    set: (target: CouchdbService, p: PropertyKey, value: any) => Reflect.set(target.nano, p, value, target.nano),
};

@Injectable()
export class CouchdbService {
    readonly nano: ServerScope;

    db: ServerScope['db'];
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
