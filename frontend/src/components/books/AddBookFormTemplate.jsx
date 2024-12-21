import React, { useState, useEffect } from "react"

function AddBookForm() {
	const [title, setTitle] = useState("")
	const [authorId, setAuthorId] = useState("")
	const [genre, setGenre] = useState("")
	const [publicationDate, setPublicationDate] = useState("")
	const [availability, setAvailability] = useState("")
	const [authors, setAuthors] = useState([])

	// Dodatkowe stany dla komunikatów
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	// Funkcja do pobrania autorów z backendu
	useEffect(() => {
		const fetchAuthors = async () => {
			try {
				const response = await fetch("/Authors") // Upewnij się, że endpoint jest poprawny
				if (!response.ok) {
					throw new Error(`Błąd pobierania autorów: ${response.statusText}`)
				}
				const data = await response.json()
				setAuthors(data)
				if (data.length > 0) {
					setAuthorId(data[0].id)
				}
			} catch (err) {
				console.error(err)
				setError("Nie udało się pobrać listy autorów.")
			}
		}

		fetchAuthors()
	}, [])

	// Funkcja obsługująca wysyłanie formularza
	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError("")
		setSuccess("")

		const bookData = {
			title,
			author_id: authorId,
			genre,
			publication_date: publicationDate,
			availability_status: availability === "true",
		}

		try {
			const response = await fetch("/books", {
				// Upewnij się, że endpoint jest poprawny
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bookData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || "Błąd podczas dodawania książki.")
			}

			const createdBook = await response.json()
			console.log("Dodano książkę:", createdBook)
			setSuccess("Książka została pomyślnie dodana!")

			// Resetowanie formularza po sukcesie
			setTitle("")
			setAuthorId(authors.length > 0 ? authors[0].id : "")
			setGenre("")
			setPublicationDate("")
			setAvailability("")
		} catch (err) {
			console.error(err)
			setError(err.message || "Wystąpił nieoczekiwany błąd.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="form-block" style={styles.formBlock}>
			<h1>ADD BOOK</h1>

			{error && <p style={styles.error}>{error}</p>}
			{success && <p style={styles.success}>{success}</p>}

			<form onSubmit={handleSubmit} style={styles.form}>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					name="title"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					style={styles.input}
				/>

				<label htmlFor="author-select-add-book">Author:</label>
				<select
					id="author-select-add-book"
					name="author_id"
					value={authorId}
					onChange={(e) => setAuthorId(e.target.value)}
					required
					style={styles.select}
				>
					{authors.map((author) => (
						<option key={author.id} value={author.id}>
							{author.name}
						</option>
					))}
				</select>

				<label htmlFor="genre">Genre:</label>
				<input
					type="text"
					name="genre"
					id="genre"
					value={genre}
					onChange={(e) => setGenre(e.target.value)}
					required
					style={styles.input}
				/>

				<label htmlFor="publicationdate">Publication Date:</label>
				<input
					type="date"
					name="publication_date"
					id="publicationdate"
					value={publicationDate}
					onChange={(e) => setPublicationDate(e.target.value)}
					required
					style={styles.input}
				/>

				<label>Availability:</label>
				<div style={styles.radioGroup}>
					<div>
						<input
							type="radio"
							name="availability_status"
							id="available-true"
							value="true"
							checked={availability === "true"}
							onChange={(e) => setAvailability(e.target.value)}
							required
						/>
						<label htmlFor="available-true">True</label>
					</div>
					<div>
						<input
							type="radio"
							name="availability_status"
							id="available-false"
							value="false"
							checked={availability === "false"}
							onChange={(e) => setAvailability(e.target.value)}
							required
						/>
						<label htmlFor="available-false">False</label>
					</div>
				</div>

				<button type="submit" disabled={loading} style={styles.button}>
					{loading ? "Adding..." : "Add Book"}
				</button>
			</form>
		</div>
	)
}

const styles = {
	formBlock: {
		border: "1px solid #ccc",
		padding: "20px",
		margin: "20px",
		borderRadius: "5px",
		backgroundColor: "#f9f9f9",
		maxWidth: "500px",
		marginLeft: "auto",
		marginRight: "auto",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "15px",
	},
	input: {
		padding: "8px",
		fontSize: "16px",
		borderRadius: "4px",
		border: "1px solid #ccc",
	},
	select: {
		padding: "8px",
		fontSize: "16px",
		borderRadius: "4px",
		border: "1px solid #ccc",
	},
	radioGroup: {
		display: "flex",
		gap: "20px",
	},
	button: {
		padding: "10px",
		fontSize: "16px",
		backgroundColor: "#4CAF50",
		color: "white",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
	},
	error: {
		color: "red",
		marginBottom: "10px",
	},
	success: {
		color: "green",
		marginBottom: "10px",
	},
}

export default AddBookFormTemplate
