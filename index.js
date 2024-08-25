const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/database.js')

const app = express()

// Middleware
app.use(bodyParser.json())


// Database connection test
sequelize.authenticate()
    .then(() => {
        console.log("-> DATABASE CONNECTION: SUCCESS")
        const PORT = process.env.PORT || 5454
        app.listen(PORT, () => {
        console.log(`SERVER USES PORT: ${PORT}`)
})
    })
    .catch(err => {
        console.error("-> DATABASE CONNECTION: FAILURE ")
    })

