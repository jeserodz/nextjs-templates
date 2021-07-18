import { AuthChecker, Authorized, Field } from 'type-graphql';
import {
  applyResolversEnhanceMap,
  applyModelsEnhanceMap,
  Role,
  // } from '@generated/type-graphql';
} from '../../prisma/generated/type-graphql';

// Add authorization to resolvers
applyResolversEnhanceMap({
  User: {
    user: [Authorized()],
    users: [Authorized(Role.ADMIN)],
  },
});

// Add authorization to model fields
applyModelsEnhanceMap({
  User: {
    fields: {
      hashedPassword: [Field({ nullable: true })],
    },
  },
});

// Authorization logic
export const authChecker: AuthChecker = (_, roles: Role[]) => {
  return true; // or false if access is denied
};
