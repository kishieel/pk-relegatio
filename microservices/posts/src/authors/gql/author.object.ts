import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLCuid, GraphQLDateTimeISO } from 'graphql-scalars';

@ObjectType()
export class Author {
    @Field(() => GraphQLCuid)
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(() => GraphQLDateTimeISO)
    createdAt: Date;

    @Field(() => GraphQLDateTimeISO)
    updatedAt: Date;
}
