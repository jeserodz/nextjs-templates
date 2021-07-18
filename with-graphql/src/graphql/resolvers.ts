import { NonEmptyArray } from 'type-graphql';
// import { resolvers as GeneratedResolvers } from '@generated/type-graphql';
import { resolvers as GeneratedResolvers } from '../../prisma/generated/type-graphql';

export const resolvers: NonEmptyArray<Function> = [...GeneratedResolvers];
