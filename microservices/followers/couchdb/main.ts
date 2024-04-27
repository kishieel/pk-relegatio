import { NestFactory } from '@nestjs/core';
import { MigrationModule } from '@couchdb/migration.module';
import { MigrationService } from '@couchdb/migration.service';

async function bootstrap() {
    const app = await NestFactory.create(MigrationModule);

    const service = app.get(MigrationService);
    await service.createDatabaseIfNotExists();
    await service.migrate();

    await app.close();
}

bootstrap();
