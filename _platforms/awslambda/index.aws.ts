// This file is the entry point for AWS lambda function

import { ApolloServer, gql } from 'apollo-server-lambda';
import ApolloApp from './graphql';

const ApolloInstance = ApolloApp(ApolloServer, gql);

const apolloOptions = {
  cors: {
    origin: '*',
    methods: 'POST',
    allowedHeaders: ['Content-Type', 'Origin', 'Accept'],
  },
};

exports.handler = ApolloInstance.createHandler(apolloOptions);
