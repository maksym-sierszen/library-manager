import { useState } from "react"

import "./App.css"
import React from "react"
// import NavBar from "./components/NavBar"
// import AuthorSection from "./components/authors/AuthorSection"
// import BookSection from "./components/books/BookSection"
// import UserSection from "./components/users/UserSection"
// import BookTable from "./components/BookTable"
import AddBookForm from "./components/books/AddBookForm"
import RemoveBookForm from "./components/books/RemoveBookForm"

function App() {
	return (
		<div>
			<AddBookForm />
			<RemoveBookForm />
		</div>
	)
}

export default App
