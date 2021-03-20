import express from 'express';
import config from '@src/config';
import db from '../libs/sequelize';

// eslint-disable-next-line no-console
const log = (...args: string[]) =>
  !process.env.JEST_WORKER_ID && console.log('[SEQUELIZE] ', ...args);

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/rest/version', async (req, res) => {
  const result = await db.sequelize
    .query(`SELECT uuid FROM "User";`)
    .then((data: Array<_obj>) => {
      return data[0];
    })
    .catch((error: string) => {
      log('## Could not connect to the database', error);
      return [] as Array<_obj>;
    });

  res.send(config.version + '\n' + JSON.stringify(result, null, 2) + '\n');
});

export default app;
