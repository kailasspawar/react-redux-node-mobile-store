'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cart', 
    { cid: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
    },
    count: {
      type: Sequelize.INTEGER
    },
    pid : {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        }
    },
    uid : {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('cart');
  }
};
