import React from "react"
import AddBookForm from "../components/books/AddBookForm"
import RemoveBookForm from "../components/books/RemoveBookForm"

function BooksPage() {
	return (
		<div>
			<AddBookForm />
			<RemoveBookForm />
		</div>
	)
}

export default BooksPage
