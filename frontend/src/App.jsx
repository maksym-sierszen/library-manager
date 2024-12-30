import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import React from "react"

import HomePage from "./pages/HomePage"
import BooksPage from "./pages/BooksPage"
import AuthorsPage from "./pages/AuthorsPage"
import AboutPage from "./pages/AboutPage"

function App() {
	return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/books">Books</Link>
					</li>
					<li>
						<Link to="/authors">Authors</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/books" element={<BooksPage />} />
				<Route path="/authors" element={<AuthorsPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="*" element={<h1>404 - Page Not Found</h1>} />
			</Routes>
		</Router>
	)
}

export default App
