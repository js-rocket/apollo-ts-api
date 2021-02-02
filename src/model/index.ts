import { Sequelize, DataTypes } from 'sequelize';
import registerUser from './User';
import registerUserDetail from './UserDetail';

const registerModels = (sequelize: Sequelize): _obj => {
  const models = {
    User: registerUser(sequelize, DataTypes),
    UserDetail: registerUserDetail(sequelize, DataTypes),
  };

  return models;
};

export default registerModels;
