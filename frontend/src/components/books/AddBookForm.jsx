import React, { useState, useEffect } from "react"
const formatDateFromInput = (date) => {
	if (!date) return "" // Jeśli data jest pusta, zwracamy pusty string
	const [year, month, day] = date.split("-") // Zakładamy format YYYY-MM-DD
	return `${year}-${month}-${day}` // Zwracamy w tym samym formacie (możesz dostosować)
}
function AddBookForm() {
	const [title, setTitle] = useState("")
	const [authorID, setAuthorID] = useState("")
	const [genre, setGenre] = useState("")
	const [publicationDate, setPublicationDate] = useState("")
	const [availability, setAvailability] = useState(false)
	const [authors, setAuthors] = useState([])

	// Extra states for info message
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	// Get authors from the backend
	const fetchAuthors = async () => {
		try {
			const response = await fetch("/api/authors") // endpoint
			const data = await response.json()
			setAuthors(data) // set list of authors in state
		} catch (err) {
			console.error("Error fetching authors:", err)
			setError("Failed to load authors")
		}
	}

	// Wywołanie fetchAuthors przy pierwszym renderze komponentu
	useEffect(() => {
		fetchAuthors()
	}, [])

	// Handling submit
	const handleSubmit = async (e) => {
		// e as parameter stands for event
		e.preventDefault() // prevents default behaviour of form which is reloading the site
		setLoading(true) // might be used for loading bar view (?)
		setError("") // clears error statement
		setSuccess("") // clears success statement

		const bookData = {
			title,
			author_id: authorID,
			genre,
			publication_date: publicationDate,
			availability_status: availability === true, // change it to get data from radio buttons
		}

		try {
			const response = await fetch("/api/books", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bookData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error) || "Error while adding book"
			}

			const createdBook = await response.json()
			console.log("Added book to the database:", createdBook)
			setSuccess("Book added successfully")

			// reset the form after success
			setTitle("")
			setAuthorID(authors.length > 0 ? authors[0].id : "")
			setGenre("")
			setPublicationDate("")
			setAvailability("")
		} catch (err) {
			console.error(err)
			setError(err.message || "An unexpected error occured")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>ADD BOOK</h1>

			{error && <p style={{ color: "red" }}>{error}</p>}
			{success && <p style={{ color: "green" }}>{success}</p>}

			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>

				<label htmlFor="author-select-add-book">Author:</label>
				<select
					id="author-select-add-book"
					name="author_id"
					value={authorID}
					onChange={(e) => setAuthorID(e.target.value)}
					required
				>
					<option value="" disabled>
						Select author
					</option>
					{authors.map((author) => (
						<option key={author.id} value={author.id}>
							{author.first_name} {author.last_name}
						</option>
					))}
				</select>
				<label htmlFor="genre">Genre:</label>
				<input
					type="text"
					id="genre"
					value={genre}
					onChange={(e) => setGenre(e.target.value)}
				/>

				<label htmlFor="publication-date">Publication Date:</label>
				<input
					type="date"
					id="publication-date"
					value={publicationDate ? formatDateFromInput(publicationDate) : ""}
					onChange={(e) => setPublicationDate(e.target.value)}
				/>

				<label htmlFor="avalability">Availability</label>
				<input
					type="radio"
					name="availability"
					value="true"
					checked={availability === true}
					onChange={(e) => setAvailability(e.target.value === "true")}
				/>

				<input
					type="radio"
					name="availability"
					value="false"
					checked={availability === false}
					onChange={(e) => setAvailability(e.target.value === "false")}
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	)
}

export default AddBookForm
