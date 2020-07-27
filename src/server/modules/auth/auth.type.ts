import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { InputType, Field, ObjectType } from "@nestjs/graphql";

export interface JwtDto {
  sub: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

@InputType()
export class SignupInput {
  @Field()
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
@ObjectType()
export class User {
  @Field()
  id: string;
  @Field()
  name: string;
}

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field((_) => User)
  user: User;
}
