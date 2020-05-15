'use strict';

const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports =  db.sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    info: Sequelize.STRING,
    company: Sequelize.STRING,
    inCart: Sequelize.BOOLEAN,
    img: Sequelize.STRING
  }, 
  {
    timestamps: false
  });