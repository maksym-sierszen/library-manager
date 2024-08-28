const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');

const Borrow = sequelize.define('Borrow', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id',
      
            }
        },
    borow_date: {
        type: DataTypes.DATE,
    },
    return_date: {
        type: DataTypes.DATE,
    }
    }    

        )

module.exports = Borrow