// This file is the entry point for AWS lambda function

import { ApolloServer } from 'apollo-server-lambda';
import ApolloServerOptions from './graphql';

const apolloOptions = ApolloServerOptions();

const cors = {
  origin: '*',
  methods: 'POST',
  allowedHeaders: ['Content-Type', 'Origin', 'Accept'],
};

const apolloServer = new ApolloServer(apolloOptions);

export const handler = apolloServer.createHandler({ cors });
