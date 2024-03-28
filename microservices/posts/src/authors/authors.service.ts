import { Injectable } from '@nestjs/common';
import { Author } from '@app/authors/gql/author.object';

@Injectable()
export class AuthorsService {
    async getPaginated(): Promise<Author[]> {
        return [
            {
                uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
                firstName: 'Adam',
                lastName: 'Nowak',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }

    async getByUuid(uuid: string): Promise<Author> {
        return {
            uuid: uuid,
            firstName: 'Adam',
            lastName: 'Nowak',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
