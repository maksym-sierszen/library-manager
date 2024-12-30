import React, { useState, useEffect } from "react"

function RemoveBookForm() {
	const [bookID, setBookID] = useState("")
	const [books, setBooks] = useState([])

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const fetchBooks = async () => {
		try {
			const response = await fetch("/api/books")
			const data = await response.json()
			setBooks(data)
		} catch (err) {
			console.error("Error fetching books", err)
			setError("Failed to load books")
		}
	}

	useEffect(() => {
		fetchBooks()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault() // prevents default behaviour of form which is reloading the site
		setLoading(true) // might be used for loading bar view (?)
		setError("") // clears error statement
		setSuccess("") // clears success statement

		try {
			const response = await fetch(`/api/books/${bookID}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error) || "Error while adding book"
			}

			console.log(`Book with ID ${bookID} was deleted`)
			setSuccess("Book removed successfully")
			setBookID("")
			await fetchBooks()
		} catch (err) {
			console.error(err)
			setError(err.message || "An unexpected error occured")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>REMOVE BOOK</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{success && <p style={{ color: "green" }}>{success}</p>}

			<form onSubmit={handleSubmit}>
				<label htmlFor="books-select-remove-book">Title</label>
				<select
					name="book_id"
					id="books-select-remove-book"
					value={bookID}
					onChange={(e) => setBookID(e.target.value)}
					required
				>
					<option value="" disabled>
						Select book
					</option>
					{books.map((book) => (
						<option key={book.id} value={book.id}>
							{book.title}
						</option>
					))}
				</select>
				<button type="submit">Remove</button>
			</form>
		</div>
	)
}
export default RemoveBookForm
