import { Args, Query, Resolver } from '@nestjs/graphql';
import { Author } from '@app/authors/gql/author.object';
import { AuthorsService } from '@app/authors/authors.service';
import { GraphQLCuid } from 'graphql-scalars';

@Resolver(() => Author)
export class AuthorsResolver {
    constructor(private readonly authorsService: AuthorsService) {}

    @Query(() => [Author])
    async authors(): Promise<Author[]> {
        return this.authorsService.getPaginated();
    }

    @Query(() => Author)
    async author(@Args('id', { type: () => GraphQLCuid }) id: string): Promise<Author> {
        return this.authorsService.getById(id);
    }
}
