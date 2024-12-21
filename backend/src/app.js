const express = require("express")
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public")) // Middleware for static files

// Routes
const bookRoutes = require("../routes/books.js")
const authorRoutes = require("../routes/author.js")
const userRoutes = require("../routes/user.js")

app.use("/books", bookRoutes)
app.use("/authors", authorRoutes)
app.use("/users", userRoutes)

// // Main Endpoint
// app.get("/", (req, res) => {
// 	res.send(__dirname + "/public/index.html")
// })

module.exports = app
