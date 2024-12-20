const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const User = require("./user")
const Book = require("./book")

const Borrow = sequelize.define(
	"Borrow",
	{
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
		},
		book_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Book,
				key: "id",
			},
		},
		borow_date: {
			type: DataTypes.DATE,
		},
		return_date: {
			type: DataTypes.DATE,
		},
	},
	{
		tableName: "borrows",
		freezeTableName: true,
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
)

module.exports = Borrow
