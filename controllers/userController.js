const User = require("../models/user.js")
const bcrypt = require("bcryptjs")
const { format } = require("date-fns")

const createUser = async (req, res) => {
	try {
		const { email, password, first_name, last_name, birth_date } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)
		// const formattedBirthDate = format(new Date(birth_date), "yyyy-MM-dd")

		const user = User.create({
			email,
			password: hashedPassword,
			first_name,
			last_name,
			birth_date,
		})

		res.status(201)
		console.log("+ User added", user)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = { createUser }
