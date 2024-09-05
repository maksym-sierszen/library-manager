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


},
{
    tableName: 'users', 
    freezeTableName: true, 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}
)
module.exports = User