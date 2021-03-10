/* eslint-disable no-undef */

//TODO fix up jest module aliases

// import request from 'supertest';

// import { closeConnection } from '@src/libs/sequelize';
// import { app } from './app';

// jest.mock('', () => ({ }) )

// Sanity check
describe('Sanity Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

/*
describe('Test /version endpoint', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/version');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});


// test graphql system without database access
describe('Test /graphql endpoint', () => {
  it('should return successful result', async () => {
    const res = await request(app).post('/graphql').send({ query: `{ test }` });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data', { test: 'OK' });
  });
});

afterAll((done) => {
  closeConnection();
  done();
});
*/
