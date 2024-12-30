const Book = require("../models/book")
const Author = require("../models/author")

const createBook = async (req, res) => {
	try {
		const { title, author_id, genre, publication_date, availability_status } =
			req.body

		const book = await Book.create({
			title,
			author_id,
			genre,
			publication_date,
			availability_status: availability_status === "true",
		})
		res.status(201).json(book)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const getAllBooks = async (req, res) => {
	try {
		const books = await Book.findAll({
			include: { model: Author, attributes: ["first_name", "last_name"] },
		})
		res.status(200).json(books)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getBookById = async (req, res) => {
	try {
		const book = await Book.findByPk(req.params.id)
		if (book) {
			res.status(200).json(book)
		} else {
			res.status(404).json({ error: "Book not found" })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const deleteBook = async (req, res) => {
	try {
		const { id } = req.params // take id form url
		if (!id) {
			return res.status(400).json({ error: "Book ID is required" })
		}

		const book = await Book.findByPk(id)
		if (!book) {
			return res.status(404).json({ error: "Book not found" })
		}

		await book.destroy()
		res.status(200).json({ message: "Book removed successfully" })
	} catch (error) {
		console.error("Error in deleteBook:", error)
		res.status(500).json({ error: "Internal server error" })
	}
}

module.exports = { createBook, getAllBooks, getBookById, deleteBook }
