import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

// ..:: Legend ::..
//
// id
// firstName
// lastName
// email
// secondName
// secondLastName
// document
// documentType
// nationality
// birthday
// tag

@InputType()
export class UserInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  id: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  firstName: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  lastName: string | null;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  secondName: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  secondLastName: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  document: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  documentType: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  nationality: string | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  birthday: Date | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  tag: string | null;
}
