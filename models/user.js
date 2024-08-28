const {DataTypes} = require("sequelize")
const sequelize = require("../config/database");

const User = sequelize.define('User',
{
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    
    },
    birth_date: {
        type: DataTypes.DATE,
    },
    email: {
        type: DataTypes.STRING,
    }


})
module.exports = User