const request = require("supertest")
const { app, server } = require("../app.js")
const Book = require("../models/book.js")
const models = require("../models/index.js")
const sequelize = require("../config/database.js")

jest.mock("../models/book.js")

describe("GET /books", () => {
	it("should return all books with status 200", async () => {
		Book.findAll.mockResolvedValue([{ title: "Book 1" }, { title: "Book 2" }])

		const response = await request(app).get("/books")

		expect(response.status).toBe(200)
		expect(response.body).toEqual([{ title: "Book 1" }, { title: "Book 2" }])
	})
	it("should return 500 if an error occurs", async () => {
		Book.findAll.mockRejectedValue(new Error("Database error"))

		const response = await request(app).get("/books")

		expect(response.status).toBe(500)
	})
})

afterAll(async () => {
	await server.close()
	await sequelize.close()
})
