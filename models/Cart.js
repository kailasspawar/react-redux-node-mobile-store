'use strict';
const Sequelize = require('sequelize')
const db = require('../database/db.js')
const Product = require('./Product');
const User = require('./User');

var Cart = db.sequelize.define('cart', {
  cid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
    count: Sequelize.INTEGER,
    pid: Sequelize.INTEGER,
    uid: Sequelize.INTEGER
  },  {
    timestamps: false,
    freezeTableName: true,
  });

  Cart.belongsTo(Product, {foreignKey: 'pid'});
  Cart.hasMany(User, {foreignKey: 'uid'});
  
  module.exports = {
    Cart : Cart
  };