const express = require("express")
const bookController = require("../controllers/bookController")
const router = express.Router()

router.post("/", bookController.createBook)
router.delete("/:id", bookController.deleteBook);
router.get("/", bookController.getAllBooks)
router.get("/:id", bookController.getBookById)

module.exports = router
