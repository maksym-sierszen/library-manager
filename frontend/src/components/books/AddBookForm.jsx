import React, { useState, useEffect } from 'react';

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [availability, setAvailability] = useState('');
  const [authors, setAuthors] = useState([]);

  // Przykładowy efekt pobierania listy autorów
  // W prawdziwej aplikacji wykorzystaj fetch lub axios do pobrania danych z API
  useEffect(() => {
    // Mock danych autorów
    const fakeAuthors = [
      { id: 1, name: 'Author One' },
      { id: 2, name: 'Author Two' }
    ];
    setAuthors(fakeAuthors);
    setAuthorId(fakeAuthors.length > 0 ? fakeAuthors[0].id : '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      title,
      author_id: authorId,
      genre,
      publication_date: publicationDate,
      availability_status: availability
    };

    // Tu wysyłasz dane do backendu, np.:
    // fetch('/books', { method: 'POST', headers: {...}, body: JSON.stringify(bookData) })
    // lub axios.post('/books', bookData)
    console.log('Dodawanie książki:', bookData);

    // Reset formularza po wysłaniu
    setTitle('');
    setAuthorId(authors.length > 0 ? authors[0].id : '');
    setGenre('');
    setPublicationDate('');
    setAvailability('');
  };

  return (
    <div className="form-block">
      <h1>ADD BOOK</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
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
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        >
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>

        <label htmlFor="genre">Genre: </label>
        <input
          type="text"
          name="genre"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />

        <label htmlFor="publicationdate">Publication Date: </label>
        <input
          type="date"
          name="publication_date"
          id="publicationdate"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          required
        />

        <label>Availability:</label>
        <div>
          <input
            type="radio"
            name="availability_status"
            id="available-true"
            value="true"
            checked={availability === 'true'}
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
            checked={availability === 'false'}
            onChange={(e) => setAvailability(e.target.value)}
            required
          />
          <label htmlFor="available-false">False</label>
        </div>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBookForm;
