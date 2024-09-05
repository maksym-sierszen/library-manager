const express = require('express');
const sequelize = require('./config/database.js');

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
// Middleware for static files
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Server Listening
app.listen(PORT, () => {  // Listening on all interfaces
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});

// Main Endpoint
app.get('/', (req, res) => {
    res.send(__dirname + '/public/index.html' );
});

// Database Connection Test
sequelize.authenticate()
    .then(() => {
        console.log("-> DATABASE CONNECTION: SUCCESS");
    })
    .catch(err => {
        console.error("-> DATABASE CONNECTION: FAILURE ", err);
    });

const Book = require('./models/book.js');
const Author = require('./models/author.js');
const User = require('./models/user.js');
const Borrow = require('./models/borrow.js');

sequelize.sync()
    .then(() => {
        console.log('SUCCESS: MODELS SYNCHRONIZED WITH THE DATABASE');
    })
    .catch(err => {
        console.log('FAILURE: COULD NOT SYNCHRONIZE MODELS WITH THE DATABASE', err);
    });



// CREATE New Book
app.post('/Books', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ ALL Books
app.get('/Books', async (req, res) => {
  try {
    const books = await Book.findAll();
    console.log('Pobrano książki:', books);  // Dodaj logi, aby sprawdzić, czy rekordy są pobierane
    res.status(200).json(books);
  } catch (error) {
    console.error('Błąd podczas pobierania książek:', error);
    res.status(500).json({ error: error.message });
  }
});


// READ ONE Book
app.get('/books/:id', async (req, res) => {
    console.log('GET /books/:id endpoint hit');
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
// DELETE ONE book
app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id)
        if (book) {
            await book.destroy()
            res.status(200).json({message: 'Book removed'})
        } else {
            res.status(404).json({error: 'Book not found'})
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
})

// ADD Author
app.post('/authors', async (req, res) => {
    try {
        //const { first_name, last_name, nationality, birth_year } = req.body
        const author = await Author.create(req.body)
        res.status(201)
        console.log("Dodano autora:", author)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
