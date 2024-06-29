import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstName: string | null;

  @Field(() => String, { nullable: true })
  lastName: string | null;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  secondName: string | null;

  @Field(() => String, { nullable: true })
  secondLastName: string | null;

  @Field(() => String, { nullable: true })
  document: string | null;

  @Field(() => String, { nullable: true })
  documentType: string | null;

  @Field(() => String, { nullable: true })
  nationality: string | null;

  @Field(() => Date, { nullable: true })
  birthday: Date | null;

  @Field(() => ID, { nullable: true })
  tag: string | null;
}
