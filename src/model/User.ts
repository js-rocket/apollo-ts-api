/*
  User table should contain minimum amount of fields to support authentication
  Keep other user details in separate table
*/

import { Sequelize, Model, ModelCtor } from 'sequelize';

interface UserInstance extends Model {
  id: number;
  uuid: string;
  email: string;
  password: string;
  salt: string;
  status: number;
  role: number;
  verifyCode: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

const createFieldDefinition = (Datatype: _obj) => ({
  id: { autoIncrement: true, primaryKey: true, type: Datatype.BIGINT },
  uuid: { type: Datatype.UUID, allowNull: false, unique: true, defaultValue: Datatype.UUIDV4 },

  email: { type: Datatype.STRING, allowNull: false, validate: { isEmail: true } },
  password: { type: Datatype.STRING, allowNull: false },
  salt: { type: Datatype.STRING, allowNull: false },

  // Roles and permissions
  status: { type: Datatype.INTEGER, allowNull: false },
  role: { type: Datatype.INTEGER, allowNull: false },
  // permissions: { type: Datatype.STRING, allowNull: false },

  verifyCode: { type: Datatype.UUID, allowNull: true, unique: true, field: 'verify_code' },

  // standard info
  created_at: { type: Datatype.DATE, allowNull: false, defaultValue: Date.now() },
  updated_at: { type: Datatype.DATE, allowNull: false, defaultValue: Date.now() },
  deleted_at: { type: Datatype.DATE, allowNull: true, defaultValue: '' },
});

const indexes: _obj[] = [];

const options = {
  underscored: true,
  timestamps: true,
  freezeTableName: true,
  indexes,
};

// const getterMethods = {
//   fullName() {
//     return [this.first_name, this.last_name].join(' ');
//   },
// };

const registerUser = (sequelize: Sequelize, Datatype: _obj): ModelCtor<UserInstance> => {
  const User = sequelize.define<UserInstance>('User', createFieldDefinition(Datatype), {
    ...options,
    // getterMethods,
  });

  return User;
};

export default registerUser;
