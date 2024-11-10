const app = require("./app")
const { connectDB } = require("./config/database.js")
require("./models/index.js") // associations have to be declared before sequelize.sync

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== "test") {
	connectDB()
		.then(() => {
			app.listen(PORT, () => {
				console.log(`-> SERVER IS RUNNING ON PORT: ${PORT}`)
			})
		})
		.catch((err) => {
			console.error("! Error starting server:", err)
		})
}
