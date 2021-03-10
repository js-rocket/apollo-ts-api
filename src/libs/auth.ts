/*
Authentication related functions
*/

import crypto from 'crypto';
import jwt from 'jwt-simple';

import config from '@src/config';

export const encryptPassword = (password: string, salt: string): string => {
  const shasum = crypto.createHash('sha1');
  shasum.update(`${password}${salt}${config.auth.salt}`);
  return shasum.digest('hex');
};

// generates a user access token (JWT) for a user object
export const getUserToken = (user: _obj): string => {
  const payload = {
    id: user.id,
    uuid: user.uuid,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * config.auth.expiration,
  };
  const token = jwt.encode(payload, config.auth.secret, <jwt.TAlgorithm>config.auth.algorithm);

  return token;
};

// returns null if token is not valid or expired, returns decoded payload if valid
export const isUserTokenValid = (token: string): string => {
  let data = '';

  try {
    data = jwt.decode(token, config.auth.secret, false, <jwt.TAlgorithm>config.auth.algorithm);
  } catch (e) {} // eslint-disable-line no-empty

  return data;
};
