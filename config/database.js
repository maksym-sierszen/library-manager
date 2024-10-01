require("dotenv").config()
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "postgres",
		port: process.env.DB_PORT,
		logging: false,
	}
)

const connectDB = async () => {
	try {
		await sequelize.authenticate().then(() => {
			console.log("-> DATABASE CONNECTION: SUCCESS")
		})

		await sequelize.sync().then(() => {
			console.log("-> MODELS SYNCHRONIZATION: SUCCESS")
		})
	} catch (error) {
		console.error("! DATABASE CONNECTION: FAILURE", error)
	}
}

module.exports = { sequelize, connectDB }
