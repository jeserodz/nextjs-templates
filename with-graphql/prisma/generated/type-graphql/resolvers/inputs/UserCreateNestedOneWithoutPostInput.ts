import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserCreateOrConnectWithoutPostInput } from "../inputs/UserCreateOrConnectWithoutPostInput";
import { UserCreateWithoutPostInput } from "../inputs/UserCreateWithoutPostInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserCreateNestedOneWithoutPostInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutPostInput, {
    nullable: true
  })
  create?: UserCreateWithoutPostInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutPostInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutPostInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;
}
