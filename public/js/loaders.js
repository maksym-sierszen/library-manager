import { fetchAuthors, fetchBooks } from "./api.js"


const loadAuthorsOptions = async () => {
    try {
        const response = await fetch("/authors")
        const authors = await response.json()

        const selects = [
            document.getElementById("author-select-remove-author"),
            document.getElementById("author-select-add-book"),
        ]

        selects.forEach((select) => {
            // Clear existing options
            select.innerHTML = ""
            authors.forEach((author) => {
                const option = document.createElement("option")
                option.value = author.id
                option.textContent = `${author.first_name} ${author.last_name}`
                select.appendChild(option)
            })
        })
    } catch (error) {
        console.error("Error loading authors:", error)
    }
}

const loadBooksOptions = async () => {
    try {
        const response = await fetch("/books")
        const books = await response.json()

        const select = document.getElementById("book-select")
        books.forEach((book) => {
            const option = document.createElement("option")
            option.value = book.id
            option.textContent = `${book.title} ${book.publication_date}`
            select.appendChild(option)
        })
    } catch (error) {
        console.error("Error loading books:", error)
    }
}
const loadBooksList = async () => {
    console.log("Button clicked, trying to load books")

    try {
        const response = await fetch("/books")
        const books = await response.json()
        const tableBody = document.querySelector("#books-list")
        tableBody.innerHTML = "" // Clear the existing table content

        books.forEach((book) => {
            const row = document.createElement("tr")

            const idCell = document.createElement("td")
            idCell.textContent = book.id
            row.appendChild(idCell)

            const titleCell = document.createElement("td")
            titleCell.textContent = book.title
            row.appendChild(titleCell)

            const authorCell = document.createElement("td")
            authorCell.textContent = `${book.Author.first_name} ${book.Author.last_name}`
            row.appendChild(authorCell)

            const genreCell = document.createElement("td")
            genreCell.textContent = book.genre
            row.appendChild(genreCell)

            const publicationDateCell = document.createElement("td")
            publicationDateCell.textContent = book.publication_date
            row.appendChild(publicationDateCell)

            const availabilityCell = document.createElement("td")
            availabilityCell.textContent = book.availability_status
            row.appendChild(availabilityCell)

            tableBody.appendChild(row)
        })
    } catch (error) {
        console.error("Error loading books:", error)
    }
}

module.exports = { loadAuthorsOptions, loadBooksList, loadBooksOptions }