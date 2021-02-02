/*
  The resolver index should not contain any logic
  It should just call a function that returns a result
*/

import { userLogin, userSignup } from './user';

const Mutation = {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  UserSignup: async (parent: _obj, args: _obj, context: _obj, info: _obj): Promise<string> => {
    const { db } = context;
    const { signupInput } = args;

    return userSignup(db, signupInput);
  },

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  UserLogin: async (parent: _obj, args: _obj, context: _obj, info: _obj): Promise<_obj> => {
    const { db } = context;
    const { email, password } = args;

    return userLogin(db, email, password);
  },
};

export default Mutation;
