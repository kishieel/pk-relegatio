import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class PostCreateInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    content: string;
}
