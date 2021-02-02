/* eslint-disable no-unused-vars,strict,@typescript-eslint/no-unused-vars */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insert = () =>
      queryInterface.bulkInsert(
        'User',
        [
          {
            id: 1,
            email: 'js+admin@rokt.io',
            password: 'adasda',
            salt: '90ut50ut0',
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
