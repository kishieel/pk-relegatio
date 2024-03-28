import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignUpInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    username: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    lastName: string;
}
