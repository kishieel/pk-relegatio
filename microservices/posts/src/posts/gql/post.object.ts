import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { GraphQLDateTimeISO, GraphQLCuid } from 'graphql-scalars';

@ObjectType()
export class Post {
    @Field(() => GraphQLCuid)
    id: string;

    @Field(() => GraphQLCuid)
    @Directive('@inaccessible')
    authorId: string;

    @Field()
    title: string;

    @Field()
    slug: string;

    @Field()
    content: string;

    @Field(() => GraphQLDateTimeISO)
    createdAt: Date;

    @Field(() => GraphQLDateTimeISO)
    updatedAt: Date;
}
