/*
  The resolver index should not contain any logic
  It should just call a function that returns a result
*/

// import { systemHealthCheck } from '@src/libs/system';
// import { isTokenValid } from '@src/libs/auth';
import { sendEmail } from '@src/services/email';

const Query = {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  version: (parent: _obj, args: _obj, context: _obj, info: _obj): string =>
    `1.0.0 (${new Date().toISOString()})`,

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  // healthCheck: async (parent, args, context, info) => {
  //   const { password } = args;
  //   const { db } = context;

  //   const healthStatus = await systemHealthCheck(db, password);
  //   return healthStatus;
  // },

  /* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
  healthCheck: async (
    parent: _obj,
    args: _obj,
    context: _obj,
    info: _obj,
    /* eslint-enable no-unused-vars,@typescript-eslint/no-unused-vars */
  ): Promise<Array<string>> => {
    // const { password } = args;
    // const { db } = context;

    const result = await sendEmail(
      'kitwalka@gmail.com',
      'Test send grid',
      `The time is ${new Date()}`,
    );
    console.log('## sendEmail', result); // eslint-disable-line no-console
    return ['sent'];
  },
};

export default Query;
