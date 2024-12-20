export const fetchAuthors = async () => {
	const response = await fetch("/authors")
	return await response.json()
}

export const fetchBooks = async () => {
	const response = await fetch("/books")
	return await response.json()
}
