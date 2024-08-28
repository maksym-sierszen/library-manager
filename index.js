const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/database.js')

// const fs = require('fs')
// const path = require('path')

const app = express()

// Middleware
app.use(express.json()); // Zastąpione bodyParser.json() przez express.json(), które jest wbudowane


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

// Sync database with models
// const models = fs.readdirSync("./models")
// console.log(models) 

const Book = require('./models/book.js')
const Author = require('./models/author.js')
const User = require('./models/user.js')
const Borrow = require('./models/borrow')

sequelize.sync()
    .then(() => {
        console.log('SUCCESS: MODELS SYNCHRONIZED WITH THE DATABASE')
    })
    .catch(err => {
        console.log('FAILURE: COULDNT SYNCHRONIZE MODELS WITH THE DATABASE', err)
    })
