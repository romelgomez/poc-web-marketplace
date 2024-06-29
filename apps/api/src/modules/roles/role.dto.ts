// import {
//   IsBoolean,
//   IsDate,
//   IsEnum,
//   IsOptional,
//   IsString,
//   IsUUID,
// } from 'class-validator';
// import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
// import { Role as IRole, RoleType } from '@prisma/client';

// // @ObjectType()
// // export class Role implements IRole {
// //   @Field(() => ID, { nullable: true })
// //   @IsUUID()
// //   id: string;

// //   @Field(() => ID, { nullable: true })
// //   tag: string | null;

// //   @Field({
// //     description: 'Date and time when the role was assigned.',
// //   })
// //   assigned: Date;

// //   @Field(() => ID, { nullable: true, defaultValue: '' })
// //   @IsOptional()
// //   userId: string | null;

// //   @Field()
// //   accountId: string | null;

// //   @Field(() => RoleType)
// //   role: RoleType;

// //   @Field()
// //   created: Date;

// //   @Field()
// //   modified: Date;

// //   @Field({ nullable: true })
// //   deleted: Date | null;
// // }

// @InputType()
// export class RoleDto {
//   @Field({ nullable: true })
//   @IsUUID()
//   @IsOptional()
//   id?: string;

//   @Field({
//     description: 'Date and time when the role was assigned.',
//   })
//   assigned: Date;

//   @Field(() => ID, { nullable: true, defaultValue: '' })
//   @IsOptional()
//   userId: string | null;

//   @Field()
//   accountId: string | null;

//   @Field(() => RoleType)
//   @IsEnum({
//     type: 'enum',
//     enum: RoleType,
//     default: RoleType.VIEWER,
//   })
//   role: RoleType;

//   @Field({ nullable: true })
//   @IsDate()
//   @IsOptional()  created?: Date;

//   @Field({ nullable: true })
//   @IsDate()
//   @IsOptional()
//   modified?: Date;

//   @Field({ nullable: true })
//   @IsDate()
//   @IsOptional()
//   deleted?: Date;
// }
