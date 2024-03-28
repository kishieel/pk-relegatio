import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLDateTimeISO, GraphQLUUID } from 'graphql-scalars';

@ObjectType()
export class Author {
    @Field(() => GraphQLUUID)
    uuid: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(() => GraphQLDateTimeISO)
    createdAt: Date;

    @Field(() => GraphQLDateTimeISO)
    updatedAt: Date;
}
