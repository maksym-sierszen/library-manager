const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const Author = require("./author.js")
const Book = sequelize.define(
	"Book",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		author_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Author,
				key: "id",
			},
		},
		genre: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		publication_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		availability_status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},

	{
		tableName: "books",
		freezeTableName: true,
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
)
Book.associate = (models) => {
	if (process.env.NODE_ENV !== "test") {
		Book.belongsTo(models.Author, { foreignKey: "author_id" })
	}
}
module.exports = Book
