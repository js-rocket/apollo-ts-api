import { gql, ApolloServerExpressConfig } from 'apollo-server-express';
import express from 'express';
import graphqlSchema from './schema.graphql';
import Query from './queries';
import Mutation from './mutations';
import db from '../libs/sequelize';

const resolvers = {
  Mutation,
  Query,
};

const context = async ({ req }: { req: express.Request }) => ({ db, req });

//type gqlInstance = typeof gql;

const ApolloServerOptions = (/* gql: gqlInstance */): ApolloServerExpressConfig => {
  const typeDefs = gql(graphqlSchema);
  const apolloOptions = { typeDefs, resolvers, context, introspection: true, playground: true };
  return apolloOptions;
};

export default ApolloServerOptions;
