import { Args, Query, Resolver } from '@nestjs/graphql';
import { Author } from '@app/authors/gql/author.object';
import { AuthorsService } from '@app/authors/authors.service';
import { GraphQLCuid } from 'graphql-scalars';
import { AuthorPaginationInput } from '@app/authors/gql/author-pagination.input';

@Resolver(() => Author)
export class AuthorsResolver {
    constructor(private readonly authorsService: AuthorsService) {}

    @Query(() => [Author])
    async authors(@Args('input') input: AuthorPaginationInput): Promise<Author[]> {
        [input];
        return this.authorsService.getPaginated();
    }

    @Query(() => Author)
    async author(@Args('id', { type: () => GraphQLCuid }) id: string): Promise<Author> {
        return this.authorsService.getById(id);
    }
}
