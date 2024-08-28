const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Author = sequelize.define( 'Author', 
{
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },
    birth_year: {
        type: DataTypes.INTEGER,
    }


})

module.exports = Author