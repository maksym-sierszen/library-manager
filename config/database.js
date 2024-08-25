const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Node_Library', 'maksymsierszen', '841378125mM', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5454
});

module.exports = sequelize;
