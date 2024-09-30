const Author = require("../models/author")

const createAuthor = async (req, res) => {
	try {
		//const { first_name, last_name, nationality, birth_year } = req.body
		const author = await Author.create(req.body)
		res.status(201)
		console.log("+ Author added", author)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const deleteAuthor = async (req, res) => {
	try {
		const { author_id } = req.body
		const author = await Author.findByPk(author_id)
		if (author) {
			await author.destroy()
			res.status(200).send("- Author removed succesfully")
		} else {
			res.status(404).json({ error: "Author not found" })
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getAllAuthors = async (req, res) => {
	try {
		const authors = await Author.findAll()
		res.status(200).json(authors)
	} catch (error) {
		res.status(500).json({ error: "Couldn't get Authors" })
	}
}

module.exports = { createAuthor, deleteAuthor, getAllAuthors }
