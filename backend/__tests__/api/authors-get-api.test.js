const request = require("supertest")
const { Author } = require("../../../models/index.js")
const app = require("../../src/app.js")
const { sequelize, connectDB } = require("../../config/database.js")

describe("GET / Authors", () => {
	beforeAll(async () => {
		await connectDB()
		await sequelize.sync({ force: true })

		await Author.create({
			first_name: "Tester",
			last_name: "Testerowsky",
			nationality: "Test",
		})
	})

	it("should return all authors from the database", async () => {
		const response = await request(app).get("/authors")
		expect(response.status).toBe(200)
		expect(response.body).toBeInstanceOf(Object)
	})
	it("should return author by id", async () => {
		const response = await request(app).get("/authors/1")
		expect(response.status).toBe(200)
		expect(response.body.first_name).toBe("Tester")
	})
	afterAll(async () => {
		await sequelize.close()
	})
})
