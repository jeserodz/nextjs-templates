import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchemaSync } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { resolvers } from '../../graphql/resolvers';
import { authChecker } from '../../graphql/auth';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const schema = buildSchemaSync({
  resolvers,
  authChecker,
  validate: false,
});

const apolloServer = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: ({}) => {
    return {
      prisma,
    };
  },
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export default function (req: NextApiRequest, res: NextApiResponse) {
  req.cookies;
  return handler(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
