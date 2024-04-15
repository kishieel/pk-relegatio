import { Injectable } from '@nestjs/common';
import { Author } from '@app/authors/gql/author.object';

@Injectable()
export class AuthorsService {
    async getPaginated(): Promise<Author[]> {
        return [
            {
                id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
                firstName: 'Adam',
                lastName: 'Nowak',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }

    async getById(id: string): Promise<Author> {
        return {
            id: id,
            firstName: 'Adam',
            lastName: 'Nowak',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
