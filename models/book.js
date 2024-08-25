const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define( 'Book',
   { 
    title: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    genre: {
        type: DataTypes.STRING
    },
    publication_date: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Book;