/*
  Authentication related mutations signup, login, forget password handling
*/

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import Chance from 'chance';

import { USER_ROLE, USER_STATUS } from 'src/constants';
import { encryptPassword, getUserToken } from 'src/libs/auth';

const print = console.log; // eslint-disable-line no-console,no-unused-vars,@typescript-eslint/no-unused-vars

const chance = new Chance();

const ajv = new Ajv();
addFormats(ajv);

export const userSignup = async (db: _obj, signupInput: _obj): Promise<string> => {
  const { firstName, lastName, email, password } = signupInput;

  if (!ajv.validate({ format: 'email' }, email)) throw new Error('email is invalid');

  // check if email already exists
  const findUser = await db.User.findOne({ where: { email } });
  if (findUser) {
    if (findUser.status === USER_STATUS.DISABLED) throw new Error('email is disabled');
    if (findUser.deleted_at) {
      throw new Error('email is archived');
    } else {
      throw new Error('email already exists');
    }
  }

  const salt = chance.guid();
  const newUserData = {
    email: email.toLowerCase(),
    salt,
    password: encryptPassword(password, salt),
    status: USER_STATUS.CREATED,
    role: USER_ROLE.USER,
    UserDetail: {
      firstName,
      lastName,
    },
  };

  const newUser = await db.User.create(newUserData, {
    include: [db.UserDetail],
  });
  if (!newUser) throw new Error('could not create user');

  if (newUser.email === email.toLowerCase()) return 'OK';

  throw new Error('could not signup user');
};

export const userLogin = async (db: _obj, email: string, password: string): Promise<_obj> => {
  if (!password) throw new Error('password_blank');
  if (!ajv.validate({ format: 'email' }, email)) throw new Error('Email is invalid');

  const foundUser = await db.User.findOne({
    where: { email, status: USER_STATUS.ENABLED, deleted_at: null },
  });
  if (!foundUser) throw new Error('user not found');

  if (encryptPassword(password, foundUser.salt) === foundUser.password) {
    const foundUserDetail = await db.UserDetail.findOne({ where: { UserId: foundUser.id } });
    const { firstName, lastName } = foundUserDetail;

    const token = getUserToken(foundUser);

    return {
      firstName,
      lastName,
      email: foundUser.email,
      token,
    };
  }

  throw new Error('could not login');
};
