import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserCreateWithoutPostInput } from "../inputs/UserCreateWithoutPostInput";
import { UserUpdateWithoutPostInput } from "../inputs/UserUpdateWithoutPostInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserUpsertWithoutPostInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutPostInput, {
    nullable: false
  })
  update!: UserUpdateWithoutPostInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutPostInput, {
    nullable: false
  })
  create!: UserCreateWithoutPostInput;
}
