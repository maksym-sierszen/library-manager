const dotenv = require("dotenv")

dotenv.config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
})

const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "postgres",
		port: process.env.DB_PORT,
		logging: process.env.NODE_ENV === "test" ? console.log : false,
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
