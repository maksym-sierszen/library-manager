const request = require("supertest")
const { Book, Author } = require("../../models/index.js")
const app = require("../../app.js")
const { sequelize, connectDB } = require("../../config/database.js")

describe("GET / Books", () => {
	beforeAll(async () => {
		await connectDB()
		await sequelize.sync({ force: true })

		const authorTest = await Author.create({
			first_name: "Tester",
			last_name: "Testerowsky",
			nationality: "Test",
		})
		await Book.create({
			title: "Test Book",
			author_id: authorTest.id,
			genre: "Fiction",
			publication_date: new Date(),
			availability_status: true,
		})
	})

	it("should return all books from the database", async () => {
		const response = await request(app).get("/")
		expect(response.status).toBe(200)
		expect(response.body).toBeInstanceOf(Object)
	})
	afterAll(async () => {
		await sequelize.close()
	})
})
