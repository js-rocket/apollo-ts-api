// Used for testing only

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import ApolloServerOptions from './graphql';

const apolloOptions = ApolloServerOptions();
import config from './config';

const print = console.log; // eslint-disable-line no-console,no-unused-vars,@typescript-eslint/no-unused-vars

const ApolloInstance = new ApolloServer(apolloOptions);
const router = <Application>express.Router({ strict: true, caseSensitive: true });
ApolloInstance.applyMiddleware({ app: router });

const app = express();

// log request in console
app.use((req, res, next) => {
  print(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use(router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    print(`Server running on port ${config.port}...`);
    print('Press Ctrl+C to quit.');
    console.log('Started');
  });
}

export { app };
