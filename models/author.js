const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")

const Author = sequelize.define(
	"Author",
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
		},
	},
	{
		tableName: "authors",
		freezeTableName: true,
		timestamps: true,
		createdAt: "created_at",
		updatedAt: false,
	}
)
Author.associate = (models) => {
	Author.hasMany(models.Book, { foreignKey: "author_id" })
}

module.exports = Author
