// This separate database config file is required for the sequelize migration and seed scripts
// because it does not support ES6 style exports

const postgresURL = () => {
  const DB_STRING =
    process.env.DB_URL || 'postgres://User_name:Password_value@Host_name:5432/Database_name';
  const dbfields = DB_STRING.match(/postgres:\/\/(.*):(.*)@(.*):(.*)\/(.*)/);
  return {
    username: dbfields[1],
    password: decodeURIComponent(dbfields[2]), // if required, use encodeURIcomponent on the password
    host: dbfields[3],
    port: dbfields[4],
    database: dbfields[5],
  };
};

const connection = {
  // same as index.js
  host: postgresURL().host,
  port: postgresURL().port || 5432,
  username: postgresURL().username,
  password: postgresURL().password,
  database: postgresURL().database,
  dialect: 'postgres',
  dialectOptions:
    process.env.PGSSLMODE === 'disable'
      ? ''
      : {
        ssl: {
          require: true, // for heroku Postgres databases
          rejectUnauthorized: false, // allow self signed certificates
        },
      },
  // same as index.js
  logging: false,
  seederStorage: 'sequelize', // by default it's not keeping track of the data seed
  seederStorageTableName: 'sequelize_seed',
  migrationStorageTableName: 'sequelize_migration',
};

// console.log('## connection:',connection )

module.exports = {
  dev: connection,
  uat: connection,
  prod: connection,
};
