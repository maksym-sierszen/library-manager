import React, { useState } from "react"

function AddAuthorForm() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [nationality, setNationality] = useState("")
	const [birthYear, setBirthYear] = useState("")

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault() // Prevents default form submission
		setLoading(true)
		setError("")
		setSuccess("")

		const authorData = {
			first_name: firstName,
			last_name: lastName,
			nationality,
			birth_year: birthYear,
		}

		try {
			const response = await fetch("/api/authors", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(authorData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || "Error while adding author")
			}

			const createdAuthor = await response.json()
			console.log("Added author to the database:", createdAuthor)
			setSuccess("Author added successfully")

			// Reset the form after success
			setFirstName("")
			setLastName("")
			setNationality("")
			setBirthYear("")
		} catch (err) {
			console.error(err)
			setError(err.message || "An unexpected error occurred")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>ADD AUTHOR</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{success && <p style={{ color: "green" }}>{success}</p>}

			<form onSubmit={handleSubmit}>
				<label htmlFor="first_name">First Name</label>
				<input
					type="text"
					id="first_name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>

				<label htmlFor="last_name">Last Name</label>
				<input
					type="text"
					id="last_name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>

				<label htmlFor="nationality">Nationality</label>
				<input
					type="text"
					id="nationality"
					value={nationality}
					onChange={(e) => setNationality(e.target.value)}
					required
				/>

				<label htmlFor="birth_year">Birth Year</label>
				<input
					type="number"
					id="birth_year"
					value={birthYear}
					onChange={(e) => setBirthYear(e.target.value)}
					required
				/>

				<button type="submit">Add</button>
			</form>
		</div>
	)
}

export default AddAuthorForm
