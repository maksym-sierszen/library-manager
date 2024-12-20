const { Sequelize } = require("sequelize")
const { sequelize } = require("../../config/database.js")

describe("Database connection", () => {
	it("should succesfully connect to the test database ", async () => {
		await expect(sequelize.authenticate()).resolves.not.toThrow()
		expect(sequelize.getDatabaseName()).toBe("Node_Library_Test")
	})
	afterAll(async () => {
		await sequelize.close()
	})
})

describe("Database connection error handling", () => {
	it("should throw an error when config data is inaccurate", async () => {
		const sequelizeWrongConfig = new Sequelize(
			"wrong_database",
			"wrong_user",
			"wrong_password",
			{
				host: "localhost",
				dialect: "postgres",
			}
		)
		await expect(sequelizeWrongConfig.authenticate()).rejects.toThrow()
		await sequelizeWrongConfig.close()
	})
})
