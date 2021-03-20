/* eslint-disable no-unused-vars,strict,@typescript-eslint/no-unused-vars */

'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Chance = require('chance');
// import Chance from 'chance';

const chance = new Chance();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insert = () =>
      queryInterface.bulkInsert(
        'User',
        [
          {
            id: 1,
            uuid: chance.guid(),
            email: 'js+admin@rokt.io',
            password: 'adasda',
            salt: '90ut50ut0',
            status: 20,
            role: 10,
          },
        ],
        {},
      );

    await insert();

    return true;
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('User', {
      id: { [Sequelize.Op.eq]: 1 },
    }),
};
