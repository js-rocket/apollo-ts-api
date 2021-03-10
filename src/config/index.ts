// Database connection URL follows the libpq convention:
// https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING
// example:
// DATABASE_URL=postgres://User_name:Password_value@Host_name:5432/Database_name

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

const config = {
  port: process.env.PORT || 3003,
  timezone: {
    default: 'Australia/Sydney',
  },
  database: {
    // same as database.js
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
    // same as database.js
    logging: !process.env.JEST_WORKER_ID && console.log, // eslint-disable-line no-console
  },
  auth: {
    secret: process.env.JWT_SECRET || 'my_jwt_$3cr3t',
    expiration: 1, // in minutes
    algorithm: 'HS256',
    salt: 'f0d8368d-85e2-54fb-73c4-2d60374295e3',
  },
  email: {
    fromEmail: 'js+sg@rokt.io',
    fromName: 'No Reply',
  },
};

export default config;
