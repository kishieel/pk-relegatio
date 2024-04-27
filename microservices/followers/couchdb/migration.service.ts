import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { CouchdbService } from '@app/couchdb/couchdb.service';
import dedent from 'dedent';
import { IMigrationDocument } from '@couchdb/migration.types';

@Injectable()
export class MigrationService {
    private readonly logger = new Logger(MigrationService.name);

    constructor(private readonly couchdbService: CouchdbService) {}

    async createDatabaseIfNotExists() {
        try {
            this.logger.log('Creating database if not exists');
            await this.couchdbService.use('followers').info();
            this.logger.log('Database already exists');
        } catch (error) {
            await this.couchdbService.db.create('followers');
            await this.couchdbService.use('followers').insert({
                _id: '_design/migrations',
                views: {
                    migrations: {
                        map: dedent(`
                            function (doc) {
                                if (doc.type === 'migration') {
                                    emit(doc._id, null);
                                }
                            }
                        `),
                    },
                },
            });
        }
    }

    async migrate() {
        this.logger.log('Migration started');

        const migrationsPath = path.join(__dirname, 'migrations');
        const migrations = fs.readdirSync(migrationsPath);

        for (const migrationName of migrations) {
            const migrationPath = path.join(migrationsPath, migrationName, 'index.js');

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const migrationFn = require(migrationPath).default;
            if (typeof migrationFn !== 'function') {
                throw new Error(`Invalid migration file: ${migrationPath}. Default export must be a function!`);
            }

            const migrationDoc = await this.couchdbService
                .use('followers')
                .view<IMigrationDocument>('migrations', 'migrations', {
                    key: migrationName,
                });

            if (migrationDoc.rows.length > 0) {
                this.logger.log(`Migration ${migrationName} already applied`);
                continue;
            }

            const newMigrationDoc: IMigrationDocument = {
                _id: migrationName,
                type: 'migration',
                startedAt: new Date().toISOString(),
            };

            try {
                await migrationFn(this.couchdbService);
                newMigrationDoc.finishedAt = new Date().toISOString();
                this.logger.log(`Migration ${migrationName} finished`);
            } catch (error) {
                newMigrationDoc.failedAt = new Date().toISOString();
                newMigrationDoc.error = error?.message || error.toString();
                this.logger.error(`Migration ${migrationName} failed: ${error?.message || error.toString()}`);
                throw error;
            }

            await this.couchdbService.use<IMigrationDocument>('followers').insert(newMigrationDoc);
        }

        this.logger.log('Migration finished');
    }
}
