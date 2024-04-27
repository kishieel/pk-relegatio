import { ConfigType, registerAs } from '@nestjs/config';

export const CouchdbConfigToken = 'COUCHDB_CONFIG';

export const couchdbConfig = registerAs(CouchdbConfigToken, () => ({
    url: process.env.DATABASE_URL,
}));

export const CouchdbConfigKey = couchdbConfig.KEY;
export type CouchdbConfig = ConfigType<typeof couchdbConfig>;
