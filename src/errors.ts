/* eslint-disable max-classes-per-file */
import { ValidationError } from 'sequelize';
// import bugsnag from './libs/bugsnag';

export class NotAuthorized extends Error {}
export class NotFound extends Error {}
export class NotAuthenticated extends Error {}
export class PaymentError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formatError = (error: _obj, event: _obj): _obj => {
  const err = error.originalError ? error.originalError : error;

  // Firstly we notify the error to bugsnag
  // bugsnag.notify(err, {
  //   severity: 'error',
  //   metaData: { type: 'formatError from GraphQL', ...event },
  // });

  const { constructor } = err;
  let code;
  let details;

  switch (constructor) {
    case NotAuthenticated:
      code = 'authentication_error';
      break;
    case NotAuthorized:
      code = 'authorization_error';
      break;
    case ValidationError: {
      details = error.originalError.errors;
      code = 'validation_error';
      break;
    }

    default:
      code = 'server_error';
  }

  // @see http://facebook.github.io/graphql/June2018/#example-fce18
  return {
    extensions: {
      code,
      details,
    },
    ...error,
  };
};

export { formatError };
