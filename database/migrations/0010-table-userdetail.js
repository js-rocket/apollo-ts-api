/* eslint-disable no-unused-vars,strict,@typescript-eslint/no-unused-vars */

'use strict';

const indexes = [];

const options = {
  underscored: true,
  timestamps: false,
  freezeTableName: true,
  indexes,
};

module.exports = {
  up: (queryInterface, Datatype) => {
    const createTable = () =>
      queryInterface.createTable(
        'UserDetail',
        {
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
        },
        options,
      );

    // const addColumn = () =>
    //   queryInterface.addColumn(
    //     'UserDetail', // name of Target model
    //     'UserId', // name of the key we're adding
    //     {
    //       type: Datatype.BIGINT,
    //       primaryKey: true,
    //       references: {
    //         model: 'User', // name of Source model
    //         key: 'id',
    //       },
    //     },
    //   );

    return createTable();
    // return addColumn();
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserDetail'),
};
