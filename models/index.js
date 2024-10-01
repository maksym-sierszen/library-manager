const { sequelize } = require("../config/database")
const Book = require("./book")
const Author = require("./author")
const User = require("./user")
const Borrow = require("./borrow")

const models = {
	Book,
	Author,
	User,
	Borrow,
}

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models)
	}
})

models.sequelize = sequelize // instance of Sequelize created previously in database.js

module.exports = models
