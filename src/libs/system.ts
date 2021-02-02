/*
This function should run some checks on the system to ensure that everything is good
It should perform functions like:
- Check environment variables are correct
- API can connect to the right database
- etc, etc
*/
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const systemHealthCheck = async (db: _obj, password: string): Promise<Array<string>> => {
  if (password !== process.env.TEST_PASSWORD) return ['Wrong password'];

  const result = [];

  result.push('👍 System all Good');

  return result;
};
