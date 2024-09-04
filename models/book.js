const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    publication_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true, 
});

module.exports = Book;
