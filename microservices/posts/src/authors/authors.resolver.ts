import { Query, Resolver } from '@nestjs/graphql';
import { Author } from '@app/authors/gql/author.object';
import { AuthorsService } from '@app/authors/authors.service';

@Resolver(() => Author)
export class AuthorsResolver {
    constructor(private readonly authorsService: AuthorsService) {}

    @Query(() => [Author])
    async authors(): Promise<Author[]> {
        return this.authorsService.getPaginated();
    }
}
