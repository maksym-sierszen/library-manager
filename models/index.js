const { sequelize } = require("../config/database")
const Book = require("./book")
const Author = require("./author")
const User = require("./user")
const Borrows = require("./borrows")

const models = {
	Book,
	Author,
	User,
	Borrows,
}

Author.associate({ Book })
Book.associate({ Author })

models.sequelize = sequelize // instance of Sequelize created previously in database.js

module.exports = models
