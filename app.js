const express = require("express")
const { connectDB } = require("./config/database.js")
const models = require("./models/index.js")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public")) // Middleware for static files

// Routes
const bookRoutes = require("./routes/books.js")
const authorRoutes = require("./routes/author.js")
const userRoutes = require("./routes/user.js")

app.use("/books", bookRoutes)
app.use("/authors", authorRoutes)
app.use("/users", userRoutes)

connectDB()
app
	.listen(PORT, () => {
		console.log(`-> SERVER IS RUNNING ON PORT: ${PORT}`)
	})
	.on("error", (err) => {
		console.error("! Error starting server:", err)
	})

// Main Endpoint
app.get("/", (req, res) => {
	res.send(__dirname + "/public/index.html")
})

module.exports = app
