import { ApolloServer } from 'apollo-server-express';

import config from '@src/config';
import ApolloServerOptions from '@src/graphql';
import app from '@src/rest';

const print = console.log; // eslint-disable-line no-console,no-unused-vars,@typescript-eslint/no-unused-vars

const apolloOptions = ApolloServerOptions();
const server = new ApolloServer(apolloOptions);

server.applyMiddleware({ app });

if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: config.port }, () => {
    print(`Server running on port ${config.port} ...`);
    print('Press Ctrl+C to quit.');
  });
}
