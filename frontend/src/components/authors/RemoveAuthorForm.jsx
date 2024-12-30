import React, { useState, useEffect } from "react"

function RemoveAuthorForm() {
	const [authorID, setAuthorID] = useState("")
	const [authors, setAuthors] = useState([])

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const fetchAuthors = async () => {
		try {
			const response = await fetch("/api/authors")
			const data = await response.json()
			setAuthors(data)
		} catch (err) {
			console.error("Error fetching authors", err)
			setError("Failed to load authors")
		}
	}

	useEffect(() => {
		fetchAuthors()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault() // Prevents default behaviour of form submission
		setLoading(true)
		setError("")
		setSuccess("")

		try {
			const response = await fetch(`/api/authors/${authorID}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || "Error while removing author")
			}

			console.log(`Author with ID ${authorID} was deleted`)
			setSuccess("Author removed successfully")
			setAuthorID("")
			await fetchAuthors() // Refresh the list of authors after deletion
		} catch (err) {
			console.error(err)
			setError(err.message || "An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>REMOVE AUTHOR</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{success && <p style={{ color: "green" }}>{success}</p>}

			<form onSubmit={handleSubmit}>
				<label htmlFor="authors-select-remove-author">Author</label>
				<select
					name="author_id"
					id="authors-select-remove-author"
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
				<button type="submit">Remove</button>
			</form>
		</div>
	)
}

export default RemoveAuthorForm
