import pg from 'pg';

import { Sequelize, Transaction, Op, Model, DataTypes, Options, QueryTypes } from 'sequelize';

import registerModels from '../../model';
import config from '../../config';

const db: _obj = {};

// Return BIGINT as integer in sequelize
// @see: https://github.com/sequelize/sequelize/issues/1774
pg.defaults.parseInt8 = true;

// Database connection
// const sequelizeOptions: Options = <Options>config.database;
const sequelize = new Sequelize(<Options>config.database);

// eslint-disable-next-line no-console
const log = (...args: string[]) =>
  !process.env.JEST_WORKER_ID && console.log('[SEQUELIZE] ', ...args);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    log('Connected!');
  })
  .catch((error: string) => {
    log('## Could not connect to the database', error);
  });

// Setup models and associations
const models = registerModels(sequelize);

Object.keys(models).forEach((modelName) => {
  // eslint-disable-next-line no-new
  new models[modelName](sequelize, DataTypes);
  db[modelName] = sequelize.models[modelName];
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.QueryTypes = QueryTypes;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

const closeConnection = async (): Promise<void> => sequelize.close();
export { Op, closeConnection, Transaction, Model };
