/* eslint-disable no-unused-vars,strict,@typescript-eslint/no-unused-vars */

'use strict';

module.exports = {
  up: (queryInterface, Datatype) => {
    const createTable = () =>
      queryInterface.createTable('User', {
        id: { autoIncrement: true, primaryKey: true, type: Datatype.BIGINT },
        uuid: {
          type: Datatype.UUID,
          allowNull: false,
          unique: true,
          defaultValue: Datatype.UUIDV4,
        },

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
        deleted_at: { type: Datatype.DATE, allowNull: true, defaultValue: null },
      });

    return createTable();
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('User'),
};
