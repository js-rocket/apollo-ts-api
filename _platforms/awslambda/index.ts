// This file is the entry point for AWS lambda function
import { ApolloServer } from 'apollo-server-lambda';
import ApolloServerOptions from '@src/graphql';

// GRAPHQL HANDLER
const apolloOptions = ApolloServerOptions();

const cors = {
  origin: '*',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Origin', 'Accept'],
};

const apolloServer = new ApolloServer(apolloOptions);

export const gqlhandler = apolloServer.createHandler({ cors });
