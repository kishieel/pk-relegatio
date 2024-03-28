import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { GraphQLDateTimeISO, GraphQLUUID } from 'graphql-scalars';

@ObjectType()
export class Post {
    @Field(() => GraphQLUUID)
    uuid: string;

    @Field(() => GraphQLUUID)
    @Directive('@inaccessible')
    authorUuid: string;

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
