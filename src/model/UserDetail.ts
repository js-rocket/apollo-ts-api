/*
  User table should contain minimum amount of fields to support authentication
  Keep other user details in separate table
*/
import { Sequelize, ModelCtor, Model } from 'sequelize';

interface UserDetailInstance extends Model {
  UserId: number;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  dob: number;
  notes: string;
  created_at: number;
  updated_at: number;
  associate: (db: _obj) => void;
}

const createFieldDefinition = (Datatype: _obj) => ({
  // id: { autoIncrement: true, primaryKey: true, type: Datatype.BIGINT },
  UserId: {
    primaryKey: true,
    type: Datatype.BIGINT,
    references: {
      model: 'User',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'user_id',
  },

  title: { type: Datatype.STRING, allowNull: true },
  firstName: { type: Datatype.STRING, allowNull: true, field: 'first_name' },
  lastName: { type: Datatype.STRING, allowNull: true, field: 'last_name' },
  address: { type: Datatype.STRING, allowNull: true },
  city: { type: Datatype.STRING, allowNull: true },
  postcode: { type: Datatype.STRING(16), allowNull: true },
  country: { type: Datatype.STRING, allowNull: true },
  phone: { type: Datatype.STRING, allowNull: true },
  // Date Of Birth integer in format YYYYMMDD
  dob: { type: Datatype.INTEGER, allowNull: false, defaultValue: 0 },

  notes: { type: Datatype.TEXT, allowNull: true },

  // standard info
  created_at: { type: Datatype.DATE, allowNull: false, defaultValue: Date.now() },
  updated_at: { type: Datatype.DATE, allowNull: false, defaultValue: Date.now() },
});

const indexes: _obj[] = [];

const options = {
  underscored: true,
  timestamps: true,
  freezeTableName: true,
  indexes,
};

const getterMethods = {
  fullName() {
    return [this.first_name, this.last_name].join(' ');
  },
};

const associate = (db: _obj) => {
  db.User.hasOne(db.UserDetail);
};

const registerUserDetail = (
  sequelize: Sequelize,
  Datatype: _obj,
): ModelCtor<UserDetailInstance> | _obj => {
  const UserDetail: UserDetailInstance | _obj = sequelize.define<UserDetailInstance>(
    'UserDetail',
    createFieldDefinition(Datatype),
    {
      ...options,
      getterMethods,
    },
  );

  UserDetail.associate = associate;
  return UserDetail;
};

export default registerUserDetail;
