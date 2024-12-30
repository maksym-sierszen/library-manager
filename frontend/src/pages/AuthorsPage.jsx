import React from "react"
import AddAuthorForm from "../components/authors/AddAuthorForm"
import RemoveAuthorForm from "../components/authors/RemoveAuthorForm"
function AuthorsPage() {
	return (
		<div>
			<AddAuthorForm />
			<RemoveAuthorForm />
		</div>
	)
}

export default AuthorsPage
