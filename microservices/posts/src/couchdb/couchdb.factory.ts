import { CouchdbConfig } from '@app/configs/couchdb.config';
import * as nano from 'nano';

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

export const createCouchdbService = (options: CouchdbConfig) => {
    return nano(options.url);
};

export const CouchdbService = 'CouchdbService';
export type CouchdbService = ReturnType<typeof createCouchdbService>;
