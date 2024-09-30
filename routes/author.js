const express = require("express")
const authorController = require("../controllers/authorController")
const router = express.Router()

router.post("/", authorController.createAuthor)
router.post("/delete/", authorController.deleteAuthor)
router.get("/", authorController.getAllAuthors)

module.exports = router
